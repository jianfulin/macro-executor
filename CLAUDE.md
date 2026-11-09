# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

Fanuc Macro Executor 語言的 VS Code 擴充套件，採 LSP 架構。此 repo 是 fork：`origin` 為 jianfulin/macro-executor，上游 remote `iSorp` 為 iSorp/macro-executor，已合併至上游 1.1.1。extension ID 為 `jianfulin.macro-executor`，刻意與上游不同，避免被 Marketplace 自動更新覆蓋。fork 新增了繁體中文（`zh-tw`）翻譯、`.def` 內的巢狀 `$INCLUDE`，以及 `macro.fileEncoding`（cp950 / Big5 原始碼支援）。

## 常用指令

```bash
npm install              # npm workspaces：server、client、shared
npm run compile          # tsc -b 後以 esbuild 打包 client/out/extension.js、server/out/server.js
npm run watch            # 開發用；F5 的 preLaunchTask
npm run package          # compile 後打包成 .vsix（已加 --no-dependencies；不加會因 workspaces 找不到進入點）
npm run lint             # 僅檢查 client/src/*.ts、server/src/*.ts 頂層檔案，不含 macroLanguageService/

npm run unit-test        # compile + mocha（language service 單元測試）
npm test                 # e2e：透過 sh 執行，會下載 VS Code 並啟動 Extension Host
```

執行單一測試或測試套件（mocha 跑的是編譯後的 JS，需先 compile）：

```bash
npx mocha --grep "Scanner"            # 比對 suite / test 名稱
npx mocha --grep "Scanner Token NN"
```

`--spec <檔案>` 無法縮小範圍，因為它會與 `.mocharc.json` 的 `spec` 合併，仍然跑全部測試。測試使用 `tdd` UI（`suite` / `test`）。

偵錯：VS Code 的 `Client + Server` compound（server 的 inspect port 為 6011）、`Language Service Tests`。

## 架構

```
client/src/extension.ts          啟動 LSP client；middleware 處理需要 UI 的指令與設定
client/src/common/commands.ts    編譯 / 連結 / 清理（組出 MCOMP* / MLINK* / M*CARD* 的 shell task）
client/src/debugger/             CNC debug adapter；經 gRPC 連到 macro-executor-server（FOCAS）
shared/src/                      client 與 server 共用的型別（@macro/shared）
server/src/server.ts             LSP 連線；每個 workspace folder 一組 LanguageService + FileProvider
server/src/fileProvider.ts       讀檔、解碼、解析結果快取（parsedDocuments）
server/src/l10nService.ts        server 端訊息的 localize()
server/src/macroLanguageService/ 語言核心，透過 macroLanguageService.ts 的 facade 對外
  parser/    Scanner → Parser → Node 樹（macroNodes）
  services/  各 LSP 功能的實作（macroDebugging、macroLinker 供 debugger 使用）
  languageFacts/builtinData.ts   內建函式簽章與說明文字
```

### Parser：`@` 符號會在掃描階段展開

這是理解本專案最重要的一點，集中在 `macroParser.ts` 的 `scan()`：

- 語言沒有固定的關鍵字邊界，同一段文字是符號還是 NC 語句（例如 `G01X1`）取決於有沒有對應定義。`scan()` 先查 `definitionMap`：
  - 有定義：由 `defScanner` 掃描定義的值，token 的位置仍指向原始碼中的符號（`subScanFunc` = `scanDefinition`）。
  - 無定義：回退並以 `scanNonSymbol` 重新切成 NC token。
- 因此 grammar 看到的是**展開後**的 token 流。Node 同時記錄原始碼位置（`offset` / `length`）與展開後程式位置（`progOffset` / `progLength`）。
- 文字取值要分清楚：`getText()` 是原始碼文字，`getNonSymbolText()` 是展開後的值。判斷數值或 G/M code 的邏輯（lint、call hierarchy）要用後者。
- `$INCLUDE` 在解析時遞迴展開（`MAX_INCLUDE_DEPTH` = 8），`.def` 的定義會併入目前檔案的 `definitionMap`，所以 Parser 需要 `MacroFileProvider`。
- 依副檔名選擇入口：`.def` → `_parseDefFile`、`.lnk` → `_parseLnkFile`，其餘視為 `.src` → `_parseMacroFile`。
- 回溯使用 `mark()` / `restoreAtMark()` / `try()`。新增 Parser 狀態時，必須一併納入 `IMark`，否則回溯後狀態會錯亂。

### 診斷流程

`MacroValidation.doValidation` 合併兩個來源：Parser 的語法錯誤（`ParseError`，附在 Node 上）與 `LintVisitor` 的語意規則。

新增 lint 規則需同步修改：

1. `services/lintRules.ts`：`Rules`（id 與預設層級）
2. `services/lint.ts`：`LintVisitor` 的檢查邏輯
3. `package.json`：`macro.lint.rules` 的設定 schema
4. `l10n/bundle.l10n.{de,zh-cn,zh-tw}.json`：翻譯
5. `README.md` 與 `README_TW.md` 的規則列表

### 快取與跨檔案

- `parsedDocuments` 是模組層級的全域快取，以 URI 為 key。已開啟的文件以 `version` 判斷是否重新解析；未開啟的檔案靠 `onDidChangeWatchedFiles` 失效。
- `.def` 內容變更時，`server.ts` 會重新驗證所有 include 該檔的 `.src`（需啟用 `macro.validate.workspace`）。
- `macro.fileEncoding` 只影響 `FileProvider` 從磁碟讀取的未開啟檔案；已開啟文件的內容由 VS Code 解碼。`cp950` 實際以 Big5 的 `TextDecoder` 解碼，且 BOM 優先於設定值。
- 符號與 label 的跨檔搜尋只在定義來自 `.def` 時生效，否則限於目前檔案。

## 多語系（l10n）

server 端字串以 `server/src/l10nService.ts` 的 `localize('key', 'English default')` 撰寫。client 啟動 server 時以環境變數 `L10N_BUNDLE` 傳入語系檔路徑。

| 內容 | 英文來源 | 翻譯位置（語言：`de` / `zh-cn` / `zh-tw`） |
| --- | --- | --- |
| server 訊息 | `localize()` 的預設字串 | `l10n/bundle.l10n.<語言>.json`，key 對應 `localize` 第一個參數 |
| `package.json` 的 `%key%` | `package.nls.json` | `package.nls.<語言>.json` |

- `l10n/` 與 `package.nls.*.json` 都直接手動維護，沒有產生步驟。
- 上游的 `bundle.l10n.*` 不含 `builtin.*` key；與上游同步時要保留 fork 的翻譯，`builtinData.ts` 也要維持使用 `localize`。

## 其他注意事項

- `npm test` 的 `scripts/e2e.sh` 需要 `sh`。實際使用的 fixture 在 `client/testFixture/`，由 `client/src/test/helper.ts` 解析；腳本內的 `CODE_TESTS_WORKSPACE` 指向不存在的路徑，並未被使用。
- 單元測試以 `test/fileProviderMock.ts` 取代真實檔案系統；需要 `$INCLUDE` 的測試，將內容放入其匯出的 `documents` Map。
- ESLint 規則：tab 縮排、單引號、必須加分號、`===`；server 禁用 `console`（請用 `connection.console`）。
- 巨集語言的撰寫慣例（`$Include` 路徑規則、常數大寫、陳述式之間需有空白等）見 `README.md` 的 Coding conventions。
