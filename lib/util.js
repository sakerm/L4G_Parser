"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
// Runtime will automatically promote these errors to X3Error
// errn property must match X3Error
var ParseError = /** @class */ (function (_super) {
    __extends(ParseError, _super);
    function ParseError(message) {
        var _this = _super.call(this, message) || this;
        _this.errn = 200;
        return _this;
    }
    return ParseError;
}(Error));
exports.ParseError = ParseError;
var GenError = /** @class */ (function (_super) {
    __extends(GenError, _super);
    function GenError(message) {
        var _this = _super.call(this, message) || this;
        _this.errn = 26;
        return _this;
    }
    return GenError;
}(Error));
exports.GenError = GenError;
// must match engine's variableClasses
exports.classLetters = {
    VARIABLE: 'A',
    VALUE: 'B',
    CONST: 'C',
    DEFAULT: 'D',
    GLOBAL: 'V',
    LOCAL: 'L'
};
// must match engine's variableTypes
exports.typeLetters = {
    BLBFILE: 'B',
    DATE: 'D',
    DATETIME: 'E',
    INTEGER: 'I',
    SHORTINT: 'J',
    DECIMAL: 'N',
    CHAR: 'S',
    CLBFILE: 'T',
    TINYINT: 'V',
    DOUBLE: 'W',
    ANY: 'X',
    INSTANCE: 'Y',
    UUIDENT: 'Z'
};
// must match engine instructions starting with SQL
exports.sqlInstructions = [
    'AND', 'OR', 'EQ', 'NE', 'LT', 'LE', 'GT', 'GE', 'ADD', 'SUB', 'MUL', 'DIV',
    'V', 'CV', 'F', 'EVALUE', 'INDEX', 'DECL', 'KEY',
].reduce(function (r, k) { return (r[k] = true, r); }, {});
// value is number of args, -1 if variadic
exports.functions = {
    MAXTAB: 1, DAY: 1, DAYN: 1, MONTH: 1, NDAY: 1, WEEK: 1, YEAR: 1, DAY$: 1, MONTH$: 1, TIME$: 0, ADDMONTH: 2, AWEEK: 2, DATE$: 0, DATETIME$: 0,
    GDATETIME$: 1, EOMONTH: 1, GDAT$: -1, NDAY$: 1, TIME: 0, TIMESTAMP$: 0,
    FILECLA: 0, FILEABRE: 1, FILENAME: 1, FILETYP: 0, CLANBS: 2, CLASIZ: 2, CLANAM: 1, CLAVAR: 2, CLALEV: 1, EVALUE: -1, DIR$: 0, FILEXIST: 3, FILINFO: 2,
    FILCOM: -1, FILPATH: -1, DELFILE: 1, RENAMEFILE: 2,
    ERRL: 0, ERRN: 0, ERRP: 0, ERRM: 0, ERRMES$: 1, MESS: 3, XCRYPT: 1, LEN2: 1, APPX3: 1,
    ABS: 1, MOD: 2, RND: 1, SGN: 1, SQR: 1, AR2: 1, ARR: 2, FIX: 1, INT: 1, ANP: 2, CNP: 2, FAC: 1, COS: 1, SIN: 1, TAN: 1, ACOS: 1, ASIN: 1, ATAN: 1,
    ACH: 1, ASH: 1, ATH: 1, CH: 1, SH: 1, TH: 1, EXP: 1, LN: 1, LOG: 1, PI: 0,
    SETBIT: 3, GETBIT: 2, AVG: -1, FIND: -1, FINDOBJ: -1, MAX: -1, MAXCOL: -1, MIN: -1, SUM: -1, PRD: -1, UNI: -1, VAR: -1, SIGMA: -1,
    ASCII: 1, LEN: 1, PARSE: 2, PAT: 2, VAL: 1, LEFT$: 2, MID$: 3, RIGHT$: 2, SEG$: 3, SEG2$: 3, CTRANS: -1, TOLOWER: 1, TOUPPER: 1,
    VIREBLC: -1, CHR$: 1, GRAPH$: -1, SPACE$: 1, STRING$: 2, FORMAT$: 2, NUM$: 1, INSTR: 3, XGETCHAR: 2, ESCJSON: 1, FILELEV: 1,
    ADXSEEK: 1, INPMODE: 0, VARINIT: 1, MASKLEV: 1, MASKNBF: 1, MASKRK: 1, MASKSIZ: 1, ADXPID: 0, ADXTCP: 0, ADXUID: 1, FREEMEM: 0,
    NBRUSER: 0, MASKABR: 1, MASKCOU: 0, MASKNAM: 1, ADXMAC: 1, ADXPAM: 0, ADXUSR: 0, ADXPNO: 1, DBGCALLSTACK: 2, COP$: 0, GETENV$: 1,
    TRTCOU: 0, VER$: 1, NOMAP: 0, ADXCIO: 1, ADXIOA: 1, ADXNFS: 0, MASKCLA: 0, PROGCAN: 0, PROGLDD: 0, PROGSIZ: 0, PROGUSD: 0,
    TOBLBFILE: 2, TOCLBFILE: 2, B64DECODE: 2, B64ENCODE: 2, APPEND: 2, GETUUID: 0, NULLUUID: 0, TOUUID: 1, UUID$: 0, VARMODE: 0
};
