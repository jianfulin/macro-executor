/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Simon Waelti
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as nls from 'vscode-nls';

import { FunctionSignature } from '../macroLanguageTypes';

const localize: nls.LocalizeFunc = nls.loadMessageBundle();

const paramText = {
	parameters: localize('builtin.param.parameters', 'parameters'),
	variableNumber: localize('builtin.param.variableNumber', 'variable number'),
	name: localize('builtin.param.name', 'name'),
	fileNumber: localize('builtin.param.fileNumber', 'file number'),
	fileSize: localize('builtin.param.fileSize', 'file size'),
	resultVariable: localize('builtin.param.resultVariable', 'result variable'),
	lineNumber: localize('builtin.param.lineNumber', 'line number'),
	statusVariable: localize('builtin.param.statusVariable', 'status variable'),
	accessMode: localize('builtin.param.accessMode', 'access mode'),
	pointerType: localize('builtin.param.pointerType', 'pointer type'),
	pointer: localize('builtin.param.pointer', 'pointer'),
	dataType: localize('builtin.param.dataType', 'data type'),
	dataVariable: localize('builtin.param.dataVariable', 'data variable'),
	data: localize('builtin.param.data', 'data'),
	value: localize('builtin.param.value', 'value'),
	value1: localize('builtin.param.value1', 'value1'),
	value2: localize('builtin.param.value2', 'value2'),
	base: localize('builtin.param.base', 'base'),
	exponent: localize('builtin.param.exponent', 'exponent'),
};

/**
 * Reserved interface properties
 * _bracket
 * _type
 * _param
 * _escape
 */
export const functionSignatures: { [name: string]: FunctionSignature[] } = {
	'popen': [		
		{ 
			description: localize(
				'builtin.function.popen.description',
				'The POPEN command establishes a connection to an external input/output device. It must be specified before a sequence of data output commands. The CNC outputs a DC2 control code'
			),
			delimiter: '', 
			param:[]
		}
	],
	'pclos': [	
		{ 
			description: localize(
				'builtin.function.pclos.description',
				'The PCLOS command releases a connection to an external input/output device. Specify this command when all data output commands have terminated. DC4 control code is output from the CNC'
			),
			delimiter: '', 
			param:[]
		}
	],
	'dprnt': [	
		{ 
			description: localize(
				'builtin.function.dprnt.description',
				'The DPRNT command outputs characters and each digit in the value of a variable according to the code set in the settings (ISO)'
			),
			delimiter: '',
			param: [ { _bracket: '[' }, { _param: [ { param: paramText.parameters, _type: 'prnt_param'} ] }, { _bracket: ']' } ]
		}
	],
	'bprnt': [	
		{
			description: localize(
				'builtin.function.bprnt.description',
				'The BPRNT command outputs characters and variable values in binary'
			),
			delimiter: '',
			param: [ { _bracket: '[' }, { _param: [ { param: paramText.parameters, _type: 'prnt_param'} ] }, { _bracket: ']' } ]
		}
	],
	'setvn': [	
		{ 
			description: localize(
				'builtin.function.setvn.description',
				'This function expands number of variables to which name is set by SETVN'
			),
			delimiter: ',', 
			param: [ { _param: [ { var: paramText.variableNumber, _type: 'number' } ], }, { _option: 'text' }, { _bracket: '[' }, { _param: [ { name: paramText.name, _type: 'setvn_param'} ], }, { _bracket: ']' } ]
		}
	],
	'fgen':  [
		{
			description: localize('builtin.function.fgen.description', 'File creation command'),
			delimiter: ',', 
			param: [ { _bracket: '(' }, { _param: [ { file: paramText.fileNumber}, { size: paramText.fileSize}, { result: paramText.resultVariable} ] }, { _bracket: ')' } ]
		}
	],
	'fdel':  [
		{ 
			description: localize('builtin.function.fdel.description', 'File deletion command'),
			delimiter: ',', 
			param: [ { _bracket: '(' }, { _param: [ { line: paramText.lineNumber }, { status: paramText.statusVariable } ] }, { _bracket: ')' } ]
		}
	],
	'fopen': [	
		{ 
			description: localize('builtin.function.fopen.description', 'File opening command'),
			delimiter: ',', 
			param: [ { _bracket: '(' }, { _param: [ { file: paramText.fileNumber}, { mode: paramText.accessMode}, { result: paramText.resultVariable } ] }, { _bracket: ')' } ] 
		}
	],
	'fclos': [
		{
			description: localize('builtin.function.fclos.description', 'File closing command'),
			delimiter: ',', 
			param: [ { _bracket: '(' }, { _param:[ { file: paramText.fileNumber } ] }, { _bracket: ')' } ]
		}
	],
	'fpset': [	
		{ 
			description: localize('builtin.function.fpset.description', 'Command for setting file pointer'),
			delimiter: ',',
			param: [ { _bracket: '(' }, { _param: [ { file: paramText.fileNumber}, {type: paramText.pointerType }, { pointer: paramText.pointer} ] }, { _bracket: ')' } ]
		}
	],
	'fread': [	
		{ 
			description: localize('builtin.function.fread.description', 'Command for reading files'),
			delimiter: ',', 
			param: [ { _bracket: '(' }, { _param: [ { file: paramText.fileNumber }, { type: paramText.dataType }, {var: paramText.dataVariable} ] }, { _bracket: ')' } ]
		}
	],
	'fwrit': [	
		{ 
			description: localize('builtin.function.fwrit.description', 'Command for writing files'),
			delimiter: ',', 
			param: [ { _bracket: '(' }, { _param: [ { file: paramText.fileNumber }, { type: paramText.dataType }, { data: paramText.data } ] }, { _bracket: ')' } ]
		}
	],
	'sin': [	
		{ 
			description: localize('builtin.function.sin.description', 'Sine (in degrees)'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value} ] }, { _bracket: ']' } ]
		}
	],
	'cos': [	
		{ 
			description: localize('builtin.function.cos.description', 'Cosine (in degrees)'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'tan': [	
		{ 
			description: localize('builtin.function.tan.description', 'Tangent (in degrees)'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'asin': [	
		{ 
			description: localize('builtin.function.asin.description', 'Arcsine'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'acos': [	
		{ 
			description: localize('builtin.function.acos.description', 'Arccosine'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'atan': [
		{ 
			description: localize('builtin.function.atan.twoParamsSlash.description', 'Arc tangent (two parameters), ATN can also be used'),
			param: [ { _bracket: '[' }, { _param: [ { value1: paramText.value1} ] }, { _bracket: ']' }, { _escape: '/' }, { _bracket: '[' }, { _param: [ { value2: paramText.value2} ] }, { _bracket: ']' } ]
		},
		{ 
			description: localize('builtin.function.atan.oneParam.description', 'Arc tangent (one parameter), ATN can also be used'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value} ] }, { _bracket: ']' } ]
		},
		{ 
			description: localize('builtin.function.atan.twoParamsComma.description', 'Arc tangent (two parameters), ATN can also be used'),
			delimiter: ',', 
			param: [ { _bracket: '[' }, { _param: [ { value1: paramText.value1 } , { value2: paramText.value2} ] }, { _bracket: ']' } ]
		}
	],
	'atn': [
		{ 
			description: localize('builtin.function.atn.twoParamsSlash.description', 'Arc tangent (two parameters)'),
			param: [ { _bracket: '[' }, { _param: [ { value1: paramText.value1} ] }, { _bracket: ']' }, { _escape: '/' }, { _bracket: '[' }, { _param: [ { value2: paramText.value2} ] }, { _bracket: ']' } ]
		},
		{ 
			description: localize('builtin.function.atn.oneParam.description', 'Arc tangent (one parameter)'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value} ] }, { _bracket: ']' } ]
		},
		{ 
			description: localize('builtin.function.atn.twoParamsComma.description', 'Arc tangent (two parameters)'),
			delimiter: ',', 
			param: [ { _bracket: '[' }, { _param: [ { value1: paramText.value1 } , { value2: paramText.value2} ] }, { _bracket: ']' } ]
		}
	],
	'sqrt': [	
		{ 
			description: localize('builtin.function.sqrt.description', 'Square root, SQR can also be used'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'sqr': [	
		{ 
			description: localize('builtin.function.sqr.description', 'Square root'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'abs': [	
		{ 
			description: localize('builtin.function.abs.description', 'Absolute value'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'bin': [	
		{ 
			description: localize('builtin.function.bin.description', 'Conversion from BCD to binary'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'bcd': [	
		{ 
			description: localize('builtin.function.bcd.description', 'Conversion from binary to BCD'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'round': [	
		{ 
			description: localize('builtin.function.round.description', 'Rounding off, RND can also be used'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'rnd': [	
		{ 
			description: localize('builtin.function.rnd.description', 'Rounding off'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'fix': [	
		{ 
			description: localize('builtin.function.fix.description', 'Rounding down to an integer'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'fup': [	
		{ 
			description: localize('builtin.function.fup.description', 'Rounding up to an integer'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'ln': [	
		{ 
			description: localize('builtin.function.ln.description', 'Natural logarithm'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'exp': [	
		{ 
			description: localize('builtin.function.exp.description', 'Exponent using base e (2.718...)'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'pow': [	
		{ 
			description: localize('builtin.function.pow.description', 'Power (#j to the #kth power)'),
			delimiter: ',', 
			param: [ { _bracket: '[' }, { _param: [ { base: paramText.base }, { exponent: paramText.exponent } ] }, { _bracket: ']' } ]
		}
	],
	'adp': [	
		{ 
			description: localize('builtin.function.adp.description', 'Addition of a decimal point'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		}
	],
	'prm': [
		{ 
			description: localize('builtin.function.prm.twoParamsSlash.description', 'Parameter reading (system common, path, or machine group parameter)'),
			param: [ { _bracket: '[' }, { _param: [ { value1: paramText.value1 } ] }, { _bracket: ']' }, { _escape: '/' }, { _bracket: '[' }, { _param: [ { value2: paramText.value2} ] }, { _bracket: ']' } ]
		},
		{ 
			description: localize('builtin.function.prm.oneParam.description', 'Parameter reading (system common, path, or machine group parameter)'),
			param: [ { _bracket: '[' }, { _param: [ { value: paramText.value } ] }, { _bracket: ']' } ]
		},	
		{ 
			description: localize('builtin.function.prm.twoParamsCommaBit.description', 'Parameter reading (system common, path, or machine group parameter bit number specification)'),
			delimiter: ',', 
			param: [ { _bracket: '[' }, { _param: [ { value1: paramText.value1 }, { value2: paramText.value2 } ] }, { _bracket: ']' } ]
		}
	]
};

export const NcCodeDescription: { [name: string]: string } = {
	'G00': localize('builtin.nc.G00', 'Rapid positioning'),
	'G01': localize('builtin.nc.G01', 'Linear interpolation'),
	'G02': localize('builtin.nc.G02', 'Circular interpolation, clockwise'),
	'G03': localize('builtin.nc.G03', 'Circular interpolation, counterclockwise'),
	'G04': localize('builtin.nc.G04', 'Dwell'),
	'G05': localize('builtin.nc.G05', '\tP10000\tHigh-precision contour control (HPCC)'),
	'G05.1': localize('builtin.nc.G05_1', 'Q1. AI Advanced Preview Control'),
	'G06.1': localize('builtin.nc.G06_1', 'Non-uniform rational B-spline (NURBS) Machining'),
	'G07': localize('builtin.nc.G07', 'Imaginary axis designation'),
	'G09': localize('builtin.nc.G09', 'Exact stop check, non-modal'),
	'G10': localize('builtin.nc.G10', 'Programmable data input'),
	'G11': localize('builtin.nc.G11', 'Data write cancel'),
	'G17': localize('builtin.nc.G17', 'XY plane selection'),
	'G18': localize('builtin.nc.G18', 'ZX plane selection'),
	'G19': localize('builtin.nc.G19', 'YZ plane selection'),
	'G20': localize('builtin.nc.G20', 'Programming in inches'),
	'G21': localize('builtin.nc.G21', 'Programming in millimeters (mm)'),
	'G28': localize('builtin.nc.G28', 'Return to home position (machine zero, aka machine reference point)'),
	'G30': localize('builtin.nc.G30', 'Return to secondary home position (machine zero, aka machine reference point)'),
	'G31': localize('builtin.nc.G31', 'Feed until skip function'),
	'G32': localize('builtin.nc.G32', 'Single-point threading, longhand style (if not using a cycle, e.g., G76)'),
	'G33': localize('builtin.nc.G33', 'M: Constant-pitch threading \nT: Single-point threading, longhand style (if not using a cycle, e.g., G76)'),
	'G34': localize('builtin.nc.G34', 'Variable-pitch threading'),
	'G40': localize('builtin.nc.G40', 'Tool radius compensation off'),
	'G41': localize('builtin.nc.G41', 'Tool radius compensation left'),
	'G42': localize('builtin.nc.G42', 'Tool radius compensation right'),
	'G43': localize('builtin.nc.G43', 'Tool height offset compensation negative'),
	'G44': localize('builtin.nc.G44', 'Tool height offset compensation positive'),
	'G45': localize('builtin.nc.G45', 'Axis offset single increase'),
	'G46': localize('builtin.nc.G46', 'Axis offset single decrease'),
	'G47': localize('builtin.nc.G47', 'Axis offset double increase'),
	'G48': localize('builtin.nc.G48', 'Axis offset double decrease'),
	'G49': localize('builtin.nc.G49', 'Tool length offset compensation cancel'),
	'G50': localize('builtin.nc.G50', 'M: Scaling function cancel \nT1: Define the maximum spindle speed\n T2: Position register (programming of vector from part zero to tool tip)'),
	'G52': localize('builtin.nc.G52', 'Local coordinate system (LCS)'),
	'G53': localize('builtin.nc.G53', 'Machine coordinate system'),
	'G54': localize('builtin.nc.G54', 'Work coordinate systems (WCSs)'),
	'G54.1': localize('builtin.nc.G54_1', 'P1 to P48\tExtended work coordinate systems'),
	'G55': localize('builtin.nc.G55', 'Work coordinate systems (WCSs)'),
	'G56': localize('builtin.nc.G56', 'Work coordinate systems (WCSs)'),
	'G57': localize('builtin.nc.G57', 'Work coordinate systems (WCSs)'),
	'G58': localize('builtin.nc.G58', 'Work coordinate systems (WCSs)'),
	'G59': localize('builtin.nc.G59', 'Work coordinate systems (WCSs)'),
	'G61': localize('builtin.nc.G61', 'Exact stop check, modal'),
	'G62': localize('builtin.nc.G62', 'Automatic corner override'),
	'G64': localize('builtin.nc.G64', 'Default cutting mode (cancel exact stop check mode)'),
	'G68': localize('builtin.nc.G68', 'Rotate coordinate system'),
	'G69': localize('builtin.nc.G69', 'Turn off coordinate system rotation'),
	'G70': localize('builtin.nc.G70', 'Fixed cycle, multiple repetitive cycle, for finishing (including contours)'),
	'G71': localize('builtin.nc.G71', 'Fixed cycle, multiple repetitive cycle, for roughing (Z-axis emphasis)'),
	'G72': localize('builtin.nc.G72', 'Fixed cycle, multiple repetitive cycle, for roughing (X-axis emphasis)'),
	'G73': localize('builtin.nc.G73', 'M: Peck drilling cycle for milling – high-speed (NO full retraction from pecks)\n Fixed cycle, multiple repetitive cycle, for roughing, with pattern repetition'),
	'G74': localize('builtin.nc.G74', 'M: Tapping cycle for milling, lefthand thread, M04 spindle direction \nPeck drilling cycle for turning'),
	'G75': localize('builtin.nc.G75', 'Peck grooving cycle for turning'),
	'G76': localize('builtin.nc.G76', 'M: Fine boring cycle for milling \n Threading cycle for turning, multiple repetitive cycle'),
	'G80': localize('builtin.nc.G80', 'Cancel canned cycle'),
	'G81': localize('builtin.nc.G81', 'Simple drilling cycle'),
	'G82': localize('builtin.nc.G82', 'Drilling cycle with dwell'),
	'G83': localize('builtin.nc.G83', 'Peck drilling cycle (full retraction from pecks)'),
	'G84': localize('builtin.nc.G84', 'Tapping cycle, righthand thread, M03 spindle direction'),
	'G84.2': localize('builtin.nc.G84_2', 'Tapping cycle, righthand thread, M03 spindle direction, rigid toolholder'),
	'G84.3': localize('builtin.nc.G84_3', 'Tapping cycle, lefthand thread, M04 spindle direction, rigid toolholder'),
	'G85': localize('builtin.nc.G85', 'boring cycle, feed in/feed out'),
	'G86': localize('builtin.nc.G86', 'boring cycle, feed in/spindle stop/rapid out'),
	'G87': localize('builtin.nc.G87', 'boring cycle, backboring'),
	'G88': localize('builtin.nc.G88', 'boring cycle, feed in/spindle stop/manual operation'),
	'G89': localize('builtin.nc.G89', 'boring cycle, feed in/dwell/feed out'),
	'G90': localize('builtin.nc.G90', 'M: Absolute programming \nT: Fixed cycle, simple cycle, for roughing (Z-axis emphasis)'),
	'G91': localize('builtin.nc.G91', 'Incremental programming'),
	'G92': localize('builtin.nc.G92', 'M: Position register (programming of vector from part zero to tool tip) \nT: Threading cycle, simple cycle'),
	'G94': localize('builtin.nc.G94', 'M: Feedrate per minute \n Fixed cycle, simple cycle, for roughing (X-axis emphasis)'),
	'G95': localize('builtin.nc.G95', 'Feedrate per revolution'),
	'G96': localize('builtin.nc.G96', 'Constant surface speed (CSS)'),
	'G97': localize('builtin.nc.G97', 'Constant spindle speed'),
	'G98': localize('builtin.nc.G98', 'M: Return to initial Z level in canned cycle \n Feedrate per minute (group type A)'),
	'G99': localize('builtin.nc.G99', 'M: Return to R level in canned cycle \nFeedrate per revolution (group type A)'),
	'G100': localize('builtin.nc.G100', 'Tool length measurement'),

	
	'M00': localize('builtin.nc.M00', 'Compulsory stop'),
	'M01': localize('builtin.nc.M01', 'Optional stop'),
	'M02': localize('builtin.nc.M02', 'End of program'),
	'M03': localize('builtin.nc.M03', 'Spindle on (clockwise rotation)'),
	'M04': localize('builtin.nc.M04', 'Spindle on (counterclockwise rotation)'),
	'M05': localize('builtin.nc.M05', 'Spindle stop'),
	'M06': localize('builtin.nc.M06', 'Automatic tool change (ATC)'),
	'M07': localize('builtin.nc.M07', 'Coolant on (mist)'),
	'M08': localize('builtin.nc.M08', 'Coolant on (flood)'),
	'M09': localize('builtin.nc.M09', 'Coolant off'),
	'M10': localize('builtin.nc.M10', 'Pallet clamp on'),
	'M11': localize('builtin.nc.M11', 'Pallet clamp off'),
	'M13': localize('builtin.nc.M13', 'Spindle on (clockwise rotation) and coolant on (flood)'),
	'M19': localize('builtin.nc.M19', 'Spindle orientation'),
	'M21': localize('builtin.nc.M21', 'M: Mirror, X-axis \nT: Tailstock forward'),
	'M22': localize('builtin.nc.M22', 'M: Mirror, Y-axis \nT: Tailstock backward'),
	'M23': localize('builtin.nc.M23', 'M: Mirror OFF\n T: Thread gradual pullout ON'),
	'M24': localize('builtin.nc.M24', 'Thread gradual pullout OFF'),
	'M30': localize('builtin.nc.M30', 'End of program, with return to program top'),
	'M41': localize('builtin.nc.M41', 'Gear select – gear\u00a01'),
	'M42': localize('builtin.nc.M42', 'Gear select – gear\u00a02'),
	'M43': localize('builtin.nc.M43', 'Gear select – gear\u00a03'),
	'M44': localize('builtin.nc.M44', 'Gear select – gear\u00a04'),
	'M48': localize('builtin.nc.M48', 'Feedrate override allowed'),
	'M49': localize('builtin.nc.M49', 'Feedrate override NOT allowed'),
	'M52': localize('builtin.nc.M52', 'Unload Last tool from spindle'),
	'M60': localize('builtin.nc.M60', 'Automatic pallet change (APC)'),
	'M98': localize('builtin.nc.M98', 'Subprogram call'),
	'M99': localize('builtin.nc.M99', 'Subprogram end')
};

export const SymbolText : { [node: string]: string } = {
	Variable: localize('builtin.symbolText.Variable', 'variable'),
	Label: localize('builtin.symbolText.Label', 'label'),
	String: localize('builtin.symbolText.String', 'string'),
	Numeric: localize('builtin.symbolText.Numeric', 'number'),
	Constant: localize('builtin.symbolText.Constant', 'number'),
	Statement: localize('builtin.symbolText.Statement', 'statement'),
	Assignment: localize('builtin.symbolText.Assignment', 'assignment'),
	Goto: localize('builtin.symbolText.Goto', 'goto'),
	GCode: localize('builtin.symbolText.GCode', 'g-code'),
	MCode: localize('builtin.symbolText.MCode', 'm-code'),
	Address: localize('builtin.symbolText.Address', 'address'),
	Parameter: localize('builtin.symbolText.Parameter', 'parameter'),
};
