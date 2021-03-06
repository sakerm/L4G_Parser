import { functions, ParseError } from './util';

const SP = ' '.charCodeAt(0);
const TAB = '\t'.charCodeAt(0);
const CR = '\r'.charCodeAt(0);
const LF = '\n'.charCodeAt(0);
const CH_A = 'A'.charCodeAt(0);
const CH_E = 'E'.charCodeAt(0);
const CH_Z = 'Z'.charCodeAt(0);
/* tslint:disable:variable-name */
const CH_a = 'a'.charCodeAt(0);
const CH_e = 'e'.charCodeAt(0);
const CH_z = 'z'.charCodeAt(0);
/* tslint:enable:variable-name */
const CH_0 = '0'.charCodeAt(0);
const CH_9 = '9'.charCodeAt(0);
const PAR_OPEN = '('.charCodeAt(0);
const PAR_CLOSE = ')'.charCodeAt(0);
const BRA_OPEN = '['.charCodeAt(0);
const BRA_CLOSE = ']'.charCodeAt(0);
const DOT = '.'.charCodeAt(0);
const COMMA = ','.charCodeAt(0);
const COLON = ':'.charCodeAt(0);
const SEMICOLON = ';'.charCodeAt(0);
const EQ = '='.charCodeAt(0);
const HASH = '#'.charCodeAt(0);
const DOLLAR = '$'.charCodeAt(0);
const DQUOTE = '"'.charCodeAt(0);
const SQUOTE = "'".charCodeAt(0);
const UNDER = '_'.charCodeAt(0);
const AMP = '&'.charCodeAt(0);
const BANG = '!'.charCodeAt(0);
const AT = '@'.charCodeAt(0);
const SLASH = '/'.charCodeAt(0);
const TILDE = '~'.charCodeAt(0);
const PLUS = '+'.charCodeAt(0);
const MINUS = '-'.charCodeAt(0);

export interface Operator {
    code: string;
    precedence: number;
    isPrefix: boolean;
    isInfix: boolean;
    isAssociative: boolean;
    isAssign: boolean;
}

const operators: {
    [name: string]: Operator;
} = {};

function createOp(text: string, code: string, precedence: number, isPrefix: boolean, isInfix: boolean, isAssociative: boolean, isAssign: boolean) {
    operators[text] = {
        code: code,
        precedence: precedence,
        isPrefix: isPrefix,
        isInfix: isInfix,
        isAssociative: isAssociative,
        isAssign: isAssign,
    };
}

createOp('.', 'DOT', 1, false, true, true, false);
createOp('..', 'RANGE', 6, false, true, false, false);
createOp('NOT', 'NOT', 3, true, false, false, false);
createOp('!', 'NOT', 3, true, false, false, false);
createOp('*', 'MUL', 4, false, true, true, false);
createOp('/', 'DIV', 4, false, true, true, false);
createOp('%', 'MOD', 4, false, true, true, false);
createOp('+', 'ADD', 5, true, true, true, false);
createOp('-', 'SUB', 5, true, true, true, false);
createOp('=', 'EQ', 7, false, true, false, true);
createOp('<>', 'NE', 7, false, true, false, false);
createOp('<', 'LT', 7, false, true, false, false);
createOp('<=', 'LE', 7, false, true, false, false);
createOp('>', 'GT', 7, false, true, false, false);
createOp('>=', 'GE', 7, false, true, false, false);
createOp('&', 'AND', 8, false, true, true, false);
createOp('AND', 'AND', 8, false, true, true, false);
createOp('|', 'OR', 9, false, true, true, false);
createOp('OR', 'OR', 9, false, true, true, false);
createOp('?', 'XOR', 9, false, true, true, false);
createOp('XOR', 'XOR', 9, false, true, true, false);
createOp('^', 'POW', 2, false, true, true, false);
createOp('^^', 'POW', 2, false, true, true, false);
createOp('+=', 'PLUSEQ', 10, false, true, false, true);
createOp('-=', 'MINUSEQ', 10, false, true, false, true);
createOp('*=', 'MULEQ', 10, false, true, false, true);
createOp('/=', 'DIVEQ', 10, false, true, false, true);

/*
* ParseNode class
*/
// TODO split it into specialized node classes
// use ./nodes interfaces as starting point.
export class ParseNode {
    tag: string;
    line: number;
    col: number;

    _id: number; // debugging

    // literal
    value: any;

    // common ones
    name: any;
    args: ParseNode[];
    target: any;
    from: any;
    to: any;
    letter: string;
    abbrev: string;
    field: any;
    op: any;
    exp: ParseNode;
    clas: ParseNode;
    arg: any;

    keyName: string;
    keyIndice: ParseNode[];
    keyValues: ParseNode[];

    isAssign: boolean;
    nodeOpt: ParseNode[];
    indices: ParseNode[];

    chainType: string;
    branch: ParseNode;
    branchSeq: number;
    parentLoop: ParseNode;
    prev: ParseNode;

    items: any[];
    result: ParseNode;
    returns: boolean;
    mode: any;

    lens: ParseNode[];
    ranges: ParseNode[];
    using: ParseNode;
    type: string;
    exps: ParseNode[];

    keyBy: ParseNode[];
    keyIndices: ParseNode[];
    dir: number;
    direction: number;
    keyWith: ParseNode;

    scope: string;
    files: ParseNode[];
    vars: ParseNode[];
    fromSys: ParseNode;
    fromVar: ParseNode[];
    as: ParseNode;
    term: ParseNode;

    data: any;
    statements: ParseNode[];

    lhs: ParseNode;
    rhs: ParseNode;
    label: string;
    expressions: ParseNode[];
    clasExp: ParseNode;
    seek: ParseNode;
    key: ParseNode;
    hint: ParseNode;
    lockWait: ParseNode;
    values: ParseNode[];
    classs: ParseNode[];
    symbols: ParseNode[];
    server: ParseNode;
    application: any;
    intExps: ParseNode[];
    bang: number;
    serverName: string;
    count: ParseNode;
    nohint: boolean;
    ret: string;
    rets: ParseNode[];
    nameVal: ParseNode;
    usings: any[];
    titled: ParseNode;
    list: ParseNode[];
    exp2: ParseNode;
    classes: ParseNode[];
    outer: boolean;
    where: ParseNode;
    assignments: ParseNode[];
    FROM: ParseNode;
    TO: ParseNode;
    zones: ParseNode[];
    isMask: boolean;
    columns: ParseNode[];
    isExtended: boolean;
    sep: ParseNode;
    file: ParseNode;
    mask: ParseNode;
    rep: ParseNode;
    expression: ParseNode;
    condition: ParseNode;
    stability: boolean;
    lock: boolean;
    varName: string;
    step: ParseNode;
    ins: ParseNode[];
    sql: ParseNode;
    level: ParseNode;
    vcs: any[];
    names: ParseNode[];

    progs: any;
    labels: any;

    day: number;
    month: number;
    year: number;

    order: ParseNode;
    sized: number;

    [name: string]: any;

    constructor(tag: string, line: number, col: number) {
        this.tag = tag;
        this.line = line;
        this.col = col;
    }
}

export class Parser {
    parse: () => {
        node: ParseNode;
        lines: number;
        millis: number;
    };
    parseExp: (mandatory?: boolean, precedence?: number, fparse?: (mandatory?: boolean, precedence?: number) => ParseNode) => ParseNode;
    constructor(source: string, fname?: string) {
        let line = 1,
            pos = 0,
            bol = 0;
        let statements: Node[];
        let saveBeg: number, saveEnd: number, saveLine: number, saveWord: string;
        const blocks: Node[] = [];
        const progs = {} as any;
        const labels = {} as any;

        let scopeName = ''; // for error handling

        class Node extends ParseNode {
            constructor(tag: string) {
                super(tag, line, pos - bol);
            }
            toString() {
                return format(this, 0);
            }
        }

        // see later for better parse node typing
        class DateNode extends Node {
            constructor(tag: string) {
                super(tag);
            }
        }

        function format(node: any, depth: number): string {
            if (!(node instanceof Node)) {
                if (Array.isArray(node)) {
                    return node.map((elt: any) => {
                        //console.error(depth + ": " + elt.tag);
                        return format(elt, depth + 1);
                    }).join();
                }
                return node;
            }
            let result = '';
            const prefix = '\n' + new Array(depth).join('  ');

            for (const key in node) {
                if (key !== 'toString') result += prefix + key + ': ' + format(node[key], depth + 1);
            }
            return result;
        }

        /*
    * Very low level parsing
    */

        /*function lineText() {
            const beg = source.lastIndexOf("\n", pos - 1);
            const end = source.indexOf("\n", pos);

            return beg < end ? source.substring(beg, end) : "";
        }*/

        function near() {
            const end = source.indexOf('\n', pos);

            return end < 0 ? '<end of file>' : source.substring(pos, end);
        }

        function error(message: string) {
            return new ParseError(fname + ':' + scopeName + ':' + line + ': ' + message + ' near ' + near());
        }

        function eatSpaces() {
            let ch: number;
            while ((ch = source.charCodeAt(pos)) === SP || ch === TAB || ch === CR) pos++;
            if (ch === HASH) {
                while (pos < source.length && source.charCodeAt(pos) !== LF) pos++;
            }
            if (ch === LF && source.charCodeAt(pos + 1) === AMP) {
                pos += 2;
                line++ , bol = pos - 1;
                eatSpaces();
            }
        }

        function isLetter(ch: number) {
            return ch >= CH_A && ch <= CH_Z || ch >= CH_a && ch <= CH_z;
        }

        function isDigit(ch: number) {
            return ch >= CH_0 && ch <= CH_9;
        }

        function isWordChar(ch: number) {
            return isLetter(ch) || isDigit(ch) || ch === UNDER || ch === DOLLAR;
        }

        function parseChar(ch: number, mandatory?: boolean) {
            eatSpaces();
            if (source.charCodeAt(pos) !== ch) {
                if (mandatory) throw error(String.fromCharCode(ch) + ' missing');
                return false;
            }
            pos++;
            return true;
        }

        function peekChar(ch: number) {
            eatSpaces();
            return source.charCodeAt(pos) === ch;
        }

        function parseWord(mandatory?: boolean) {
            let w: string;
            if (saveBeg === pos) {
                w = saveWord;
                pos = saveEnd;
                line = saveLine;
            } else {
                eatSpaces();
                saveBeg = pos;
                const beg = pos;
                let ch = source.charCodeAt(pos);
                if (!isLetter(ch) && ch !== UNDER) {
                    w = null;
                } else {
                    pos++;
                    while (isWordChar(ch = source.charCodeAt(pos))) pos++;
                    w = source.substring(beg, pos);
                }
                saveEnd = pos;
                saveLine = line;
                saveWord = w;
            }

            if (w === null && mandatory) throw error('identifier or keyword missing');
            return w;
        }

        function unparseWord(w: string) {
            pos -= w.length;
        }

        function parseStatementSep(mandatory?: boolean) {
            eatSpaces();
            let gotLF = parseChar(LF);
            let gotEnd = gotLF;
            if (!gotEnd) gotEnd = parseChar(COLON);
            if (mandatory && !gotEnd) throw error('end of line or colon (:) expected');
            while (gotLF) {
                line++ , bol = pos;
                eatSpaces();
                gotLF = parseChar(LF);
            }
            return gotEnd;
        }

        function skipLine() {
            let ch: number;
            while (pos < source.length && (ch = source.charCodeAt(pos)) !== LF) pos++;
            pos++;
            line++ , bol = pos;
        }

        function peekStatementSep() {
            const p = pos,
                l = line,
                b = bol;
            const found = parseStatementSep();

            pos = p, line = l, bol = b;
            return found;
        }

        /*
    * Keyword parsing
    */

        function parseKeyword(kw: string, mandatory?: boolean) {
            if (!keywords[kw] && !declKeywords[kw] && !optKeywords[kw]) throw new Error('internal parser error: not a keyword: ' + kw);
            const p = pos,
                l = line,
                b = bol;

            let w = parseWord();
            w = w && w.toUpperCase();
            if (w !== kw) {
                pos = p, line = l, bol = b;
                if (mandatory) throw error(kw + ' missing');
                return false;
            }
            return true;
        }

        function peekKeyword(kw: string) {
            const p = pos,
                l = line,
                b = bol;
            const found = parseKeyword(kw);

            pos = p, line = l, bol = b;
            return found;
        }

        function toKeyword(w: string) {
            const upper = w.toUpperCase();

            return (typeof keywords[upper] !== 'undefined' || typeof declKeywords[upper] !== 'undefined') && upper;
        }

        function obsolete(node: Node) {
            console.error('ignoring obsolete instruction: ', node);
            while (!parseStatementSep()) pos++;
        }
        /*
    * Operator parsing
    */

        function parseOperator() {
            eatSpaces();
            const p = pos,
                l = line,
                b = bol;
            const ch1 = source[pos];
            // take care of decimal literals with leading dot

            if (ch1 === '.' && isDigit(source.charCodeAt(pos + 1))) return null;
            let op: Operator;
            if ('!.*/%+-=<>&|^?'.indexOf(ch1) >= 0) {
                pos++;
                const ch2 = source[pos];
                if (ch2 === ' ' && source[pos + 1] === '=') {
                    // special hack to deal with '> =' !!
                    op = operators[ch1 + source[pos + 1]];
                    pos += 2;
                } else {
                    if ('.>=^'.indexOf(ch2) >= 0) pos++;
                    op = operators[source.substring(p, pos)];
                    if (!op && pos === p + 2) {
                        pos--;
                        op = operators[source.substring(p, pos)];
                    }
                }
            } else {
                const w = parseWord();
                if (w) op = operators[w.toUpperCase()];
            }
            if (op) return op;
            pos = p, line = l, bol = b;
            return null;
        }

        /*
    * Literals and identifiers
    */

        function parseString(end: number) {
            const beg = pos;

            let ch: number;
            while ((ch = source.charCodeAt(pos)) !== end) {
                // !ch test to avoid infinite loop at end of file
                if (ch === LF || !ch) throw error('unterminated string literal: ' + source.substring(beg - 1, pos));
                pos++;
            }
            const node = new Node('STRING');

            node.value = source.substring(beg, pos);
            pos++;
            return node;
        }

        function parseNumber(mandatory?: boolean) {
            const beg = pos;

            let ch: number;
            let decimal = false;
            while ((ch = source.charCodeAt(pos)) >= CH_0 && ch <= CH_9) pos++;
            if (source.charCodeAt(pos) === DOT && source.charCodeAt(pos + 1) !== DOT) {
                decimal = true;
                pos++;
                while ((ch = source.charCodeAt(pos)) >= CH_0 && ch <= CH_9) pos++;
            }
            if ((ch = source.charCodeAt(pos)) === CH_e || ch === CH_E) {
                pos++;
                decimal = true;
                if ((ch = source.charCodeAt(pos)) === PLUS || ch === MINUS) pos++;
                while ((ch = source.charCodeAt(pos)) >= CH_0 && ch <= CH_9) pos++;
            }
            if (pos === beg) {
                if (mandatory) throw error('number expected');
                return null;
            }

            const s = source.substring(beg, pos);
            let v: number;

            if (!decimal) {
                v = parseInt(s, 10);
                decimal = Math.abs(v) >= Math.pow(2, 31) ? true : false;
            }

            const node = new Node(decimal ? 'DECIMAL' : 'INTEGER');

            node.value = decimal ? s : v;

            if (isNaN(node.value)) throw error('bad number: ' + s);
            return node;
        }

        function parseDate() {
            const node = new DateNode('DATE');

            const n = parseNumber();
            if (n == null) throw error('class or date expected');
            node.day = n.value;
            parseChar(SLASH, true);
            node.month = parseNumber(true).value;
            parseChar(SLASH, true);
            node.year = parseNumber(true).value;
            parseChar(BRA_CLOSE, true);
            return node;
        }

        function parseIdent(mandatory?: boolean) {
            let result = parseWord();
            if (result && toKeyword(result)) {
                unparseWord(result);
                result = null;
            }
            if (!result && mandatory) throw error('mandatory identifier missing');
            return result;
        }

        function parseXMet(tag: string) {
            return function (node: Node) {
                node.tag = tag;
                let n = parseTerm(true);
                if (n.tag === 'INDEX') {
                    node.args = n.args;
                    n = n.target;
                } else {
                    node.args = [];
                }
                if (n.tag !== 'PROP') {
                    console.log('invalid ' + tag + 'obsolete syntax: .property missing');
                    node.target = new Node('THIS');
                    node.name = n.name;
                } else {
                    node.name = n.name;
                    node.target = n.target;
                }
            };
        }

        /*
    * Term
    */
        const termKeywords: { [name: string]: (node: Node) => void; } = {
            FUNC(node) {
                node.name = parseDynName();
                //parseOption(node, 'WITH', parseExps);
                if (parseChar(DOT)) {
                    node.from = node.name;
                    node.name = parseIdent(true);
                }
                if (parseKeyword('WITH')) {
                    if (peekChar(PAR_OPEN)) node.args = parseParExps();
                    else node.args = parseExps();
                } else node.args = parseParExps();
                if (!node.from) parseOption(node, 'FROM', parseDynName);
            },
            FMET: parseXMet('FMET'),
            FUNCIU: parseFuncIu,
            NEWSTC: parseNewInstance,
            NEWINSTANCE: parseNewInstance,
            NOT(node) {
                node.tag = 'OP';
                node.op = 'NOT';
                node.args = [parseTerm(true)];
            },
            DEFAULT(node) { },
            NULL(node) { },
            TYPE(node) {
                node.args = parseParExps();
                if (node.args.length === 1) {
                    if (node.args[0].tag === 'IDENT') {
                        node.field = node.args[0].value || '';
                    } else if (node.args[0].tag === 'CLAS') {
                        node.letter = node.args[0].letter;
                        node.field = node.args[0].field;
                    } else if (node.field == null) {
                        node.exp = node.args[0];
                    }
                } else {
                    throw error('invalid arg count for type function');
                }
            },
        };

        function _sigma(n: Node) {
            if (!n.args || n.args.length !== 3) throw error('bad number of arguments for sigma');
            n.tag = 'SIGMA';
            const beg = n.args[0];

            if (beg.tag === 'OP' && beg.op === 'EQ') {
                if (!beg.args[0] || beg.args[0].tag !== 'IDENT') throw error('bad sigma syntax: identifier expected before = sign');
                n.field = beg.args[0].value;
                n.args[0] = beg.args[1];
            } else {
                n.field = 'INDCUM';
            }
            return n;
        }

        function _evalue(n: Node) {
            if (!n.args || n.args.length < 1) throw error('bad number of arguments for evalue');
            n.tag = 'EVALUE';
            n.arg = n.args[0];
            delete n.args;
            return n;
        }

        function parseSimpleTerm(mandatory?: boolean) {
            let w: string, op: Operator;
            let node: Node;
            eatSpaces();
            switch (source.charCodeAt(pos)) {
                case BRA_OPEN:
                    if (isDigit(source.charCodeAt(pos + 1))) {
                        pos++;
                        return parseDate();
                    } else {
                        node = parseClass(true);
                        node.field = parseIdent();
                    }
                    break;
                case PAR_OPEN:
                    pos++;
                    node = parseExp(true);
                    parseChar(PAR_CLOSE, true);
                    return node;
                case DQUOTE:
                    pos++;
                    node = parseString(DQUOTE);
                    break;
                case SQUOTE:
                    pos++;
                    node = parseString(SQUOTE);
                    break;
                case EQ:
                    pos++;
                    return parseExp(true);
                default:
                    if (w = parseWord()) {
                        const kw = w.toUpperCase();
                        const fn = termKeywords[kw];
                        if (fn) {
                            const n = new Node(kw);
                            fn(n);
                            return n;
                        }
                        const argNum = functions[kw];
                        if (argNum != null) {
                            const n = new Node('FCALL');
                            n.name = kw;
                            if (argNum !== 0) n.args = parseParExps();
                            switch (kw) {
                                case 'SIGMA':
                                    return _sigma(n);
                                case 'EVALUE':
                                    return _evalue(n);
                                default:
                                    return n;
                            }
                        }
                        if (kw === 'DIM') {
                            const n = new Node(kw);
                            n.args = parseParExps();
                            return n;
                        }
                        if (kw === 'NBRECORD' || kw === 'UNIQID' || kw === 'ROWCOUNT') {
                            const n = new Node(kw);
                            parseChar(PAR_OPEN);
                            n.clas = parseClass(true);
                            parseChar(PAR_CLOSE, true);
                            return n;
                        }
                        if (keywords[kw] || declKeywords[kw] || optKeywords[kw]) {
                            unparseWord(w);
                            if (mandatory) {
                                throw error('missing term');
                            }
                            return null;
                        }
                        if (!/^[a-zA-Z_]{1}[a-zA-Z_0-9]*$/.test(w) && w !== 'tab$') throw error('invalid character in ' + w);
                        node = new Node('IDENT');
                        node.value = w.toUpperCase();
                    } else if (node = parseNumber()) {
                        return node;
                    } else if ((op = parseOperator()) && op.isPrefix) {
                        node = new Node('OP');
                        node.op = op.isInfix ? 'U' + op.code : op.code;
                        node.args = [parseTerm(true)];
                    } else {
                        if (mandatory) throw error('missing term');
                        return null;
                    }
                    break;
            }
            return node;
        }

        function ifContext() {
            const w = parseWord();

            if (w === null) return false;
            unparseWord(w);
            toKeyword(w);

            return ['ELSE', 'ELSEIF', 'ENDIF'].indexOf(w.toUpperCase()) >= 0;
        }

        function parseOptIndex(node: Node) {
            if (!peekChar(PAR_OPEN)) return node;
            const n = new Node('INDEX');

            n.target = node;
            n.args = parseParExps();
            return n;
        }

        function parseTerm(mandatory?: boolean) {
            let node = parseSimpleTerm(mandatory);
            if (!node) return node;
            node = parseOptIndex(node);
            let n = node;
            while (peekChar(DOT) && source.charCodeAt(pos + 1) !== DOT) {
                // . but not ..
                parseChar(DOT);
                if (peekChar(DOLLAR)) {
                    parseChar(DOLLAR);
                    const name = parseIdent(true);
                    const nn = new Node('ATT');
                    nn.target = node;
                    nn.name = '$' + name;
                    if (peekChar(DOT)) throw error('unexpected . character');
                    return nn;
                } else {
                    const name = parseIdent(true);
                    n = new Node('PROP');
                    n.target = node;
                    n.name = name;
                    node = parseOptIndex(n);
                }
            }
            return n !== node ? node : parseOptIndex(node);
        }

        /*
    * Expression
    */

        function parseWhereExp(mandatory?: boolean, precedence?: number): Node {
            if (parseKeyword('KEY')) {
                const node = new Node('WHEREKEY');
                node.keyName = parseWord(true);
                node.keyIndice = parseParExps();
                node.op = parseOperator().code;
                if (!node.op) throw error('operator missing');
                node.keyValues = parseExps(SEMICOLON);
                return node;
            } else return parseExp(mandatory, precedence, parseWhereExp);
        }

        function parseExp(mandatory?: boolean, precedence?: number, fparse?: (mandatory?: boolean, precedence?: number) => Node): Node {
            precedence = precedence !== null ? precedence : 10;
            fparse = fparse || parseExp;
            let exp = parseTerm();
            if (!exp) {
                if (mandatory) throw error('missing expression');
                return null;
            }
            while (true) {
                const p = pos,
                    l = line,
                    b = bol;
                const op = parseOperator();
                //op && console.log(op.code + ": " + op.precedence + " ? " + precedence)
                if (op == null || !op.isInfix || op.precedence > precedence) {
                    pos = p, line = l, bol = b;
                    break;
                }
                const nexp = new Node('OP');
                nexp.op = op.code;
                nexp.isAssign = op.isAssign;
                if (op.code === 'RANGE' && (peekChar(PAR_CLOSE) || peekChar(COMMA))) {
                    // special case: unterminated range
                    nexp.args = [exp];
                } else {
                    const arg = fparse(true, op.precedence - 1);
                    nexp.args = [exp, arg];
                }
                exp = nexp;
                if (!op.isAssociative && op.precedence === precedence) {
                    break;
                }
            }
            // right-associate boolean ops for efficiency
            // a  b       b  c
            //  \/ c  -> a \/
            //   \/       \/
            while ((exp.op === 'AND' || exp.op === 'OR') && exp.op === exp.args[0].op) {
                const tmp = exp.args[0].args[1]; // b
                exp.args[0].args[1] = exp;
                exp = exp.args[0];
                exp.args[1].args[0] = tmp;
            }
            return exp;
        }

        /*
    * Lists, etc.
    */

        function parseList(sep: number, fn: (mandatory?: boolean) => any, mandatory?: boolean) {
            const result: any[] = [];

            do {
                result.push(fn(mandatory));
            } while (sep && parseChar(sep) || !sep && (parseChar(COMMA) || parseChar(SEMICOLON)));
            return result;
        }

        function parseExps(sep?: number) {
            return parseList(sep, parseExp, true);
        }

        function parseWhereExps(sep?: number) {
            return parseList(sep, parseWhereExp, true);
        }

        function parseParList(sep: number, fn: (mandatory?: boolean) => any, mandatory?: boolean) {
            if (parseChar(PAR_OPEN)) {
                const result = peekChar(PAR_CLOSE) ? [] : parseList(sep, fn);
                parseChar(PAR_CLOSE, true);
                return result;
            } else {
                if (mandatory) throw error('missing (');
                return null;
            }
        }

        function parseParExps() {
            return parseParList(COMMA, parseExp);
        }

        function parseNodes(sep: number, tag: string, fn: (node: Node) => void) {
            return parseList(sep, () => {
                const node = new Node(tag);

                fn(node);
                return node;
            });
        }

        function parseOption(node: Node, kw: string, fn: (arg?: any) => any, mandatory?: boolean) {
            if (parseKeyword(kw)) {
                // we don't want JS keywords: replace with by args
                (node as any)[kw === 'WITH' ? 'args' : kw.toLowerCase()] = fn(fn === parseExp || fn === parseTerm || fn === parseClass);
            } else if (mandatory) throw error(kw + ' missing');
        }

        function parseClass(mandatory?: boolean) {
            const node = new Node('CLAS');

            if (parseChar(BRA_OPEN)) {
                if (parseChar(BRA_CLOSE)) return node;
                node.letter = parseWord(true);
                if (parseChar(COLON)) {
                    node.abbrev = parseWord(true);
                } else {
                    if (!(node.letter === 'L' || node.letter === 'V' || node.letter === 'S' || node.letter === 'M' || node.letter === 'F')) {
                        node.abbrev = node.letter;
                        node.letter = '?';
                    }
                }
                parseChar(BRA_CLOSE, true);
                return node;
            }
            if (mandatory) throw error('[class] expected');
        }

        function parseClasses(sep: number) {
            return parseList(sep, parseClass, true);
        }

        function parseColumn(mandatory?: boolean) {
            const node = parseClass() || new Node('COLUMN');

            node.field = parseIdent(false);
            node.tag = 'COLUMN';
            node.nodeOpt = parseParExps();
            return node;
        }

        function parseKey(mandatory?: boolean) {
            const node = parseClass() || new Node('KEY');

            node.field = parseIdent(mandatory && node.tag === 'KEY');
            node.indices = node.field ? parseParExps() : null;
            node.tag = 'KEY';
            return node.letter || node.abbrev || node.field ? node : null;
        }
        /*
    * Flow control
    */

        function branchChain(node: Node, chainType: string, closing?: boolean) {
            const n = blocks[blocks.length - 1];

            if (!n) throw error('unexpected ' + node.tag);
            if (n.chainType !== chainType || n.tag === 'ELSE' && !closing) throw error('unexpected ' + node.tag + ' following ' + n.tag);
            n.branch = node;
            node.branchSeq = (n.branchSeq || 0) + 1;
            if (closing) blocks.pop();
            else blocks[blocks.length - 1] = node;
        }

        function parent(chainType: string, node: Node, mandatory?: boolean) {
            for (let i = blocks.length - 1; i >= 0; i--) {
                if (blocks[i].chainType === chainType) return blocks[i];
            }
            if (mandatory) throw error(node.tag + ' unexpected outside of ' + chainType);
            return null;
        }

        function startLoop(node: Node) {
            node.chainType = 'LOOP';
            node.parentLoop = parent('LOOP', node);
            blocks.push(node);
        }

        function insideLoop(node: Node) {
            node.parentLoop = parent('LOOP', node, true);
        }

        function branchLoop(node: Node, tag: string) {
            const n = blocks[blocks.length - 1];

            if (!n) throw error('unexpected ' + node.tag);
            if (n.tag !== tag) throw error('unexpected ' + node.tag + ' following ' + n.tag);
            n.branch = node;
            node.prev = n;
            blocks.pop();
        }

        // do not wire progs and labels, only register them

        function register(nodes: { [name: string]: Node; }, node: Node) {
            if (nodes[node.name]) throw error('duplicate ' + node.tag + ' name: ' + node.name);
            nodes[node.name] = node;
        }

        function parseProg(node: Node) {
            node.name = scopeName = parseWord(true);
            node.items = parseParList(COMMA, parseWord) || [];
            register(progs, node);
        }

        function parseEnd(node: Node) {
            node.result = parseExp();
            node.returns = true;
        }

        /*
    * Declarations
    */

        function parseInstance(node: Node) {
            parseVarDecl(node, true);
        }

        const declKeywords: { [name: string]: (node: Node, ...args: any[]) => void; } = {
            CHAR: parseVarDecl,
            DATE: parseVarDecl,
            DATETIME: parseVarDecl,
            DECIMAL: parseVarDecl,
            FLOAT: parseVarDecl,
            DOUBLE: parseVarDecl,
            INTEGER: parseVarDecl,
            LIBELLE: parseVarDecl,
            TINYINT: parseVarDecl,
            SHORTINT: parseVarDecl,
            SCHAR: parseVarDecl,
            BLBFILE: parseVarDecl,
            CLBFILE: parseVarDecl,
            UUIDENT: parseVarDecl,
            FILE: parseFile,
            STRUCT: null, // obsolete
            INSTANCE: parseInstance,
            MASK: parseMask,
            INFBOX: parseInfBox,
            INPBOX: parseInpBox,
            MESBOX: parseDlgBox,
            DLGBOX: parseDlgBox,
            ONKEY: parseOn,
            ONEVENT: parseOn,
        };
        const contextualDeclKeywords: { [name: string]: (node: Node, ...args: any[]) => void; } = {
            ANY: parseVarDecl,
        };

        function parseScope(node: Node) {
            node.mode = node.tag;
            const type = node.tag = parseWord(true).toUpperCase();
            const fn = declKeywords[type] || contextualDeclKeywords[type];

            if (fn) fn(node);
            else throw error('invalid type ' + type);
        }

        function parseNewInstance(node: Node) {
            if (peekChar(EQ)) {
                // Exemple : NewInstance =OBJ.AllocGrp, C_ACHR
                // Exemple : NewInstance =CLASSNAME
                parseChar(EQ);
                const clas = parseTerm(true);
                if (peekChar(COMMA)) {
                    parseChar(COMMA);
                    node.clas = parseDynName();
                } else {
                    node.clas = clas;
                }
            } else if (peekChar(BRA_OPEN)) {
                // Exemples :
                // UPD(AI) = NewInstance [UPD], C_ADELTA
                // UPD(AI) = NewInstance [UPD] With C_ADELTA
                parseClass();
                if (peekChar(COMMA)) parseChar(COMMA);
                parseKeyword('WITH'); // optional
                node.clas = parseDynName();
            } else {
                // Exemple: NewInstance C_BID AllocGroup null
                parseClass();
                parseKeyword('WITH'); // optional
                node.clas = parseDynName();
                parseOption(node, 'ALLOCGROUP', parseDynExp);
            }
            // console.log("parseNewInstance node:",node)
        }

        function parseSyrSend(node: Node) {
            node.value = parseWord(true);
            node.op = null;
            if (parseKeyword('FIRST')) {
                node.op = 'FIRST';
            } else if (parseKeyword('NEXT')) {
                node.op = 'NEXT';
            } else if (parseKeyword('LAST')) {
                node.op = 'LAST';
            }
        }

        function parseVarDecl(node: Node, withUsing?: boolean) {
            node.mode = node.mode || 'DEFAULT';

            //node.type = (node.tag === declKeywords.LIBELLE)?declKeywords.TINYINT : node.tag ;
            if (node.tag === 'LIBELLE') node.type = 'TINYINT';
            else if (node.tag === 'FLOAT') node.type = 'DECIMAL';
            //else if (node.tag === 'DOUBLE') node.type='DECIMAL';
            else if (node.tag === 'DOUBLE') node.type = 'DOUBLE'; else if (node.tag === 'SCHAR') node.type = 'CHAR'; else node.type = node.tag;

            let using: Node;
            node.tag = 'DECL';
            node.items = parseNodes(COMMA, 'ITEM', decl => {
                //decl.name = parseExp(true, 1); // A.B allowed!
                decl.name = parseWord(true);
                decl.lens = parseParExps();
                decl.ranges = parseParExps();
                if (withUsing && !using && parseKeyword('USING')) {
                    using = parseDynName();
                }
            });
            if (withUsing) {
                if (!using) throw error('Using missing');
                node.items.forEach(decl => {
                    decl.using = using;
                });
            }
        }

        function parseWhere() {
            const node = new Node('WHERE');
            /*if (parseKeyword('KEY')) {
        node.keyName = parseWord(true);
        node.keyIndices = parseParExps();
        node.op = parseOperator();
        if (!node.op) throw error("operator missing");
        node.keyValues = parseExps(SEMICOLON);
        } else {*/
            // semicolon for weird case

            node.exps = parseWhereExps(SEMICOLON);

            //}
            return node;
        }

        function parseAscDesc() {
            if (parseKeyword('ASC')) return 1;
            else if (parseKeyword('DESC')) return -1;
        }

        function parsePositionExp() {
            const op = parseOperator();
            let kw: string;
            if (op) {
                if (['GT', 'GE', 'LT', 'LE', 'EQ'].indexOf(op.code) < 0) throw error('bad position operator: ' + op.code);
                return op.code;
            } else if (kw = parseWord()) {
                kw = kw.toUpperCase();
                // nxt is weird
                if (['CURR', 'FIRST', 'LAST', 'NEXT', 'NXT', 'PREV'].indexOf(kw) < 0) throw error('bad position keyword: ' + kw);
                return kw;
            } else {
                throw error('missing position operator or keyword');
            }
        }

        function parseOrder() {
            const node = new Node('ORDER');

            if (parseKeyword('BY')) {
                if (parseKeyword('KEY')) {
                    node.keyName = parseWord();
                    if (parseChar(EQ)) {
                        node.keyBy = parseNodes(SEMICOLON, 'ORDERITEM', n => {
                            n.exp = parseExp(true);
                            /*n.clas = parseClass();
        n.name = parseWord();*/
                            n.dir = parseAscDesc();
                        });
                    } else {
                        node.keyIndices = parseParExps();
                        node.dir = parseAscDesc();
                    }
                } else {
                    node.keyBy = parseNodes(SEMICOLON, 'ORDERITEM', n => {
                        //n.name = parseWord();
                        n.exp = parseExp(true);
                        n.dir = parseAscDesc();
                    });
                    // both comma and semicolon are allowed here!
                    //if (parseChar(SEMICOLON)) node.exps = node.exps.concat(parseExps(SEMICOLON));
                }
                node.direction = parseAscDesc();
            } else if (parseKeyword('WITH')) {
                if (parseKeyword('KEY')) {
                    node.keyName = parseWord(true);
                    parseChar(EQ, true);
                    node.keyWith = parseExp(true);
                } else {
                    node.keyWith = parseExp(true);
                }
            } else throw error("'BY' or 'WITH' expected");
            return node;
        }

        function parseOrderSort() {
            const node = new Node('ORDER');

            if (parseKeyword('BY')) {
                node.exps = parseExps(COMMA);
                node.direction = parseAscDesc();
            } else throw error("'BY' expected");
            return node;
        }

        function parseType(mandatory?: boolean) {
            const w = parseWord(true);
            const kw = toKeyword(w);

            if (declKeywords[kw]) return kw;
            if (mandatory) throw error('type keyword expected');
        }

        function parseFile(node: Node, scope: string) {
            node.tag = 'FILES';
            node.scope = scope;
            node.files = parseNodes(COMMA, 'FILE', n => {
                n.clas = parseClass();
                if (parseChar(EQ) || peekChar(DQUOTE)) {
                    n.name = dynNode();
                } else if (parseChar(PAR_OPEN)) {
                    n.vars = parseNodes(COMMA, 'VAR', decl => {
                        decl.type = parseType();
                        decl.name = parseWord();
                        decl.lens = parseParExps();
                        decl.ranges = parseParExps();
                    });
                    parseChar(PAR_CLOSE, true);
                    parseKeyword('FROM', true);
                    if (parseKeyword('VARIABLE')) n.fromVar = parseExps();
                    else if (parseKeyword('SYSTEM')) {
                        n.fromSys = new Node('SYSTEM');
                        parseSystemExp(n.fromSys);
                    } else {
                        throw error("expected 'variable' or 'system'");
                    }
                    parseKeyword('AS', true);
                    n.as = parseTerm();
                } else if (!peekChar(COMMA) && !peekStatementSep()) {
                    n.name = parseIdentNode();
                }
                if (!n.clas) n.clas = parseClass();
                parseOption(n, 'WHERE', parseWhere);
                parseOption(n, 'ORDER', parseOrder);
            });
        }

        function parseInfBox(node: Node) {
            node.args = parseExps();
            parseOption(node, 'TITLED', parseExp);
            parseOption(node, 'SLEEP', parseExp);
            parseOption(node, 'USING', parseExp);
            parseOption(node, 'AT', parseParExps);
        }

        function parseSelBox(node: Node) {
            node.args = parseExps();
            parseOption(node, 'AT', parseParExps);
            parseOption(node, 'TITLED', parseExp);
            parseOption(node, 'USING', parseExp);
            parseOption(node, 'SLEEP', parseExp);
        }

        function parseTermClass() {
            const node = new Node('TERMCLASS');

            node.term = parseTerm(true);
            node.clas = parseClass();
            return node;
        }

        function parseDbgBox(node: Node) {
            node.arg = parseExp(true);
            parseOption(node, 'FROM', parseExp);
            parseOption(node, 'AT', parseExp);
            parseOption(node, 'MASK', parseTermClass);
            parseOption(node, 'AS', parseClass);
        }

        function parseDlgBox(node: Node) {
            parseOption(node, 'MASK', parseTermClass);
            parseOption(node, 'BUTTON', parseExps);
            parseOption(node, 'WITH', parseExps);
            parseOption(node, 'CODED', parseExps);
            parseOption(node, 'TITLED', parseExp);
            parseOption(node, 'AS', parseClass);
        }

        function parseAddX(node: Node) {
            node.args = parseExps();
            parseOption(node, 'TITLED', parseExp);
            parseOption(node, 'TO', parseExp);
            parseOption(node, 'AT', parseExp);
        }

        function parseXable(node: Node) {
            node.args = parseExps();
        }

        function parseVCs() {
            return parseNodes(COMMA, 'VC', v => {
                if (parseChar(EQ)) v.exp = parseExp(true);
                else v.term = parseTerm(true);
                if (peekChar(BRA_OPEN)) v.clas = parseClass();
            });
        }

        function parseMask(node: Node, scope: string) {
            node.scope = scope;
            node.vars = parseVCs();
            return node;
        }

        function parseParameter(node: Node) {
            node.mode = node.tag;
            node.tag = 'DECL';

            function parseCommas() {
                if (!parseChar(PAR_OPEN)) return;
                const exps: Node[] = [];

                let comma: boolean;
                do {
                    comma = parseChar(COMMA);
                    if (!comma && !peekChar(PAR_CLOSE)) {
                        exps.push(parseExp(true));
                        comma = parseChar(COMMA);
                    } else {
                        exps.push(null);
                    }
                } while (comma);
                parseChar(PAR_CLOSE, true);
                return exps;
            }
            node.type = parseWord(true).toUpperCase();
            switch (node.type) {
                case 'LIBELLE':
                    node.type = 'TINYINT';
                    break;
                case 'FLOAT':
                    node.type = 'DECIMAL';
                    break;
                case 'SCHAR':
                    node.type = 'CHAR';
                    break;
            }

            node.items = parseNodes(COMMA, 'PARAM', param => {
                //param.name = parseExp(true, 1);
                param.name = parseWord(true);
                param.lens = parseCommas();
                param.ranges = parseCommas();
                parseOption(node, 'USING', parseDynName);
                parseOption(node, 'SIZED', parseExp);
            });
        }

        function addLabel(name: string) {
            const n = new Node('LABEL');

            n.name = scopeName = name;
            register(labels, n);
            statements.push(n);
        }

        const atScriptKeywords: { [name: string]: (node: Node, ...args: any[]) => void; } = {
            STRICT(node: Node) {
                const n = new Node('PRAGMA');

                n.data = {
                    strict: true,
                };
                node.statements.push(n);
            },
        };

        function parseScript(node: Node) {
            while (pos < source.length && parseChar(AT)) {
                const w = parseWord();
                const fn = w && atScriptKeywords[w.toUpperCase()];
                if (!fn) throw error('bad @ directive');
                fn(node);
            }
            while (pos < source.length) {
                let w = parseWord();
                if (w) {
                    w = w.toUpperCase();
                    const fn = keywords[w] || declKeywords[w];
                    if (fn) {
                        const n = new Node(w);
                        fn(n);
                        statements.push(n);
                    } else {
                        unparseWord(w);
                        parseStatement();
                    }
                } else {
                    if (parseChar(HASH)) skipLine();
                    else if (parseChar(LF)) {
                        line++ , bol = pos;
                    } else if (parseChar(COLON)) { } // empty statement!
                    else if (peekChar(BRA_OPEN)) parseStatement(); else if (parseChar(DOLLAR)) {
                        addLabel(parseWord(true));
                    } else throw error('bad line');
                }
                parseStatementSep();
            }
            if (blocks.length > 0) throw error('unterminated block: ' + blocks[blocks.length - 1].tag);
        }

        function parseStatement() {
            const node = new Node('STATEMENT');

            node.lhs = parseExp(true, 1);
            const op = parseOperator();

            if (!op) {
                // label without $
                if (node.lhs.tag !== 'IDENT') throw error('invalid statement syntax: ' + node.lhs.tag);
                node.tag = 'LABEL';
                node.name = scopeName = node.lhs.value;
                register(labels, node);
                delete node.lhs;
            } else {
                if (!op.isAssign) throw error('assignment operator expected');
                node.op = op.code === 'EQ' ? 'SET' : op.code;
                node.rhs = parseExp(true);
            }
            statements.push(node);
        }

        function parseResultNode(node: Node) {
            node.arg = parseExp();
        }

        function parseOpen(mode: any) {
            return function (node: Node) {
                node.tag = 'OPEN';
                node.mode = mode;
                let using = parseKeyword('USING');
                if (!using && !peekStatementSep()) {
                    node.name = parseExp(true);
                    if (parseChar(COMMA)) node.seek = parseExp(true);
                    using = parseKeyword('USING');
                }
                if (using) node.using = parseClass(true);
            };
        }

        function parseGo(node: Node) {
            parseChar(DOLLAR);
            node.label = parseWord();
            parseOption(node, 'FROM', parseDynName);
        }

        function parseEmpty(node: Node) { }

        function parseExpsStatement(node: Node) {
            node.expressions = parseExps();
        }

        function parseZoneOp(node: Node) {
            if (parseChar(EQ)) node.clasExp = parseExp(true);
            else node.clas = parseClass();
            if (parseChar(EQ)) node.arg = parseExp(true); // weird
            if (!parseStatementSep()) {
                node.exps = parseExps();
            }
        }

        function parseLockWait() {
            //parseKeyword('LOCKWAIT', true);
            const e = parseWord(true);

            if (e.toUpperCase() !== 'LOCKWAIT') throw error('invalid statement syntax: ' + e);
            parseChar(EQ, true);
            return parseExp(true);
        }

        function parseRead(node: Node) {
            node.key = parseKey();
            if (!parseStatementSep()) {
                node.op = parsePositionExp();
                if (!parseStatementSep()) {
                    if (!peekKeyword('WITH') && !peekKeyword('HINT') && !peekKeyword('NOHINT')) node.values = parseExps(SEMICOLON);
                    node.hint = parseHint();
                    if (node.tag === 'READLOCK' && parseKeyword('WITH')) {
                        node.lockWait = parseLockWait();
                    }
                }
            }
        }

        function parseClassIdWith(node: Node) {
            node.clas = parseClass();
            if (!peekKeyword('WITH')) {
                node.field = parseTerm(true);
                node.indices = parseParExps();
            }
            parseKeyword('WITH'); // optional for titled!
            if (!parseStatementSep()) {
                node.exp = parseExp(true);
            }
        }

        function dynNode() {
            const node = new Node('DYN');

            node.exp = parseExp(true);
            return node;
        }

        function parseDyn(fn: (mandatory: boolean) => Node) {
            if (parseChar(EQ)) {
                return dynNode();
            } else {
                return fn(true);
                //let node = new Node('VALUE');
                //node.value = fn(true);
                //return node;
            }
        }

        function parseIdentNode() {
            if (parseChar(DQUOTE)) return parseString(DQUOTE); // weird syntax
            const node = new Node('STRING');

            node.value = parseIdent(true);
            return node;
        }

        function parseDynName() {
            return parseDyn(parseIdentNode);
        }

        function parseDynExp() {
            return parseDyn(parseExp);
        }

        function parseDynClass() {
            return parseDyn(parseClass);
        }

        function parseXLock(node: Node) {
            if (peekChar(BRA_OPEN)) {
                node.classs = parseClasses(COMMA);
            } else {
                node.symbols = parseNodes(COMMA, 'SYMBOL', n => {
                    n.exp = parseDyn(parseTerm);
                    if (parseKeyword('FROM')) {
                        const w = parseDynName();
                        if (parseChar(AT)) {
                            n.server = w;
                            n.application = parseWord(true);
                        } else {
                            n.application = w;
                        }
                    }
                });
            }
            parseOption(node, 'WITH', parseLockWait);
        }

        function parseInsDelA(node: Node) {
            node.intExps = parseExps();
            node.vars = parseExps();
        }

        function parseAssign(node: Node, optWith?: boolean) {
            node.lhs = parseExp(true);
            node.op = 'EQ';
            parseKeyword('WITH', !optWith);
            node.rhs = parseExp(true);
        }

        function parseSystInst(node: Node) {
            node.exp = parseExp();
            parseOption(node, 'WITH', parseExps);
        }

        function parseSystemExp(node: Node) {
            let p = pos;
            const l = line,
                b = bol;
            let v = parseWord();
            if (v && parseChar(EQ)) {
                node.field = v;
            } else {
                pos = p;
            }
            if (parseChar(BANG)) node.bang = 1;
            if (parseChar(BANG)) node.bang++;
            p = pos;
            v = parseWord();
            if (parseChar(AT)) {
                node.serverName = v || '';
            } else {
                pos = p, line = l, bol = b;
            }
            node.exp = parseExp(true);
        }

        function parseXSeq(node: Node) {
            node.count = parseExp(true);
            parseChar(COMMA, true);
            node.exps = parseExps();
            parseOption(node, 'SIZED', parseExp);
            parseOption(node, 'USING', parseClass);
        }

        function parseHint() {
            let node: Node;
            if (!parseKeyword('HINT')) {
                if (parseKeyword('NOHINT')) {
                    node = new Node('HINT');
                    node.nohint = true;
                }
            } else {
                node = new Node('HINT');
                node.nohint = false;
                parseKeyword('KEY', true);
                if (parseChar(EQ)) {
                    node.key = parseExp(true);
                } else node.key = node.key = parseKey();
            }
            return node;
        }

        function parseDynNameStatement(node: Node) {
            if (!parseStatementSep()) {
                node.arg = parseDynName();
            }
        }

        function parseCallJs(node: Node) {
            node.mode = parseIdent(true);
            node.name = parseIdent(true);
            node.args = parseParExps();
            parseOption(node, 'FROM', parseDynName, true);
        }

        function parseAppend(node: Node) {
            node.tag = 'APPEND';
            const lhs = parseExp(true);

            parseChar(COMMA, true);
            const rhs = parseExp(true);

            node.args = [lhs, rhs];
        }

        function parseRetEqExpWith(node: Node) {
            if (!peekChar(DQUOTE)) {
                // ret= is missing from some callocx
                node.ret = parseWord(true);
                if (peekChar(PAR_OPEN)) {
                    node.ranges = parseParExps();
                }
                parseChar(EQ, true);
            }
            node.exp = parseExp(true);
            parseOption(node, 'WITH', parseExps);
        }

        function parseExpWith(node: Node) {
            node.exp = parseExp(true);
            parseOption(node, 'WITH', parseExps);
        }

        function parseRptX(node: Node) {
            if (!peekKeyword('USING')) {
                // clldap only has using clause
                node.rets = parseExps();
                parseOption(node, 'WITH', parseExps);
            }
            parseOption(node, 'USING', parseExp);
        }

        function parseCallIu(node: Node) {
            if (!peekKeyword('USING')) {
                node.name = parseDyn(parseTerm);
                parseOption(node, 'FROM', parseTerm);
                parseKeyword('WITH', true); // may be empty!
                if (!peekKeyword('USING')) node.args = parseExps();
            }
            parseOption(node, 'USING', parseDynClass);
        }

        function parseFuncIu(node: Node) {
            if (peekChar(DQUOTE)) node.nameVal = parseTerm(true); // odd case
            else node.name = parseDynName();
            parseOption(node, 'USING', parseClass);
            parseOption(node, 'WITH', parseParExps);
        }

        function parseSetStc(node: Node) {
            node.target = parseExp(true);
            if (parseKeyword('WITH')) {
                node.arg = parseExp(true);
                parseExp(false);
            } else {
                parseExp(true);
                parseKeyword('WITH', true);
                node.arg = parseExp(true);
            }
        }

        function parseOn(node: Node) {
            if (!parseStatementSep()) {
                node.name = parseExp(true);
                parseOption(node, 'TITLED', parseExp);
            }
        }

        function parseFilterChoose(node: Node) {
            node.clas = parseClass();
            parseOption(node, 'WHERE', parseWhere);
            parseOption(node, 'ORDER', parseOrder);
            if (node.tag === 'CHOOSE') {
                node.usings = [];
                while (parseKeyword('USING')) {
                    node.usings.push(parseNodes(COMMA, 'FIELD', n => {
                        n.name = parseExp(true);
                        if (parseKeyword('TITLED')) n.titled = parseExp(true);
                    }));
                }
                parseOption(node, 'SIZED', parseParExps);
                parseOption(node, 'TITLED', parseExp);
                parseOption(node, 'STARTING', () => {
                    parseKeyword('AT', true);
                    return parseExp(true);
                });
                // titled pos varies, second chance
                parseOption(node, 'TITLED', parseExp);
                parseOption(node, 'HINT', parseHint);
            }
            return node;
        }

        function parseTermAndList(node: Node) {
            node.term = parseTerm(true);
            node.list = parseExps();
            parseOption(node, 'FOR', parseTerm);
        }

        function parseAnaExecSql(node: Node) {
            parseOption(node, 'FROM', parseExp, true);
            parseOption(node, 'SQL', parseExp, true);
            parseOption(node, 'USING', parseTerm);
        }

        function parseButton(node: Node) {
            //node.arg = parseTerm(true);
            node.arg = parseExps(COMMA);
            parseOption(node, 'WITH', parseExps);
            parseOption(node, 'CODED', parseExps);
            parseOption(node, 'TITLED', parseExp);
        }

        function parseFolder(node: Node) {
            parseOption(node, 'MASK', parseTerm, true);
            parseOption(node, 'TITLED', parseExp);
        }

        function parseListbox(node: Node) {
            node.arg = parseTerm(true);
            node.items = parseNodes(COMMA, 'ITEM', n => {
                n.arg = parseExp(true);
                if (parseChar(EQ)) n.exp2 = parseTerm(true);
                parseOption(n, 'USING', parseExp);
                parseOption(n, 'TITLED', parseExp);
                parseOption(n, 'WITH', () => {
                    const nn = new Node('ARG');

                    nn.key = parseTerm(true);
                    parseChar(EQ, true);
                    nn.values = parseExps(SEMICOLON);
                    return nn;
                });
            });
            parseOption(node, 'SIZED', parseParExps);
            parseOption(node, 'TITLED', parseExp);
        }
        const itemKeywords: { [name: string]: (node: Node, ...args: any[]) => void; } = {
            BUTTON: parseButton,
            FOLDER: parseFolder,
            INVFOL: parseFolder,
            LISTBOX: parseListbox,
            TREEBOX: parseListbox,
            PICKBOX: parseListbox,
            LEFTBOX: parseListbox,
        };

        function parseInpBox(node: Node) {
            if (!peekKeyword('MASK')) node.arg = parseExp(true);
            parseOption(node, 'FROM', parseExp);
            parseOption(node, 'AT', parseExp);
            parseOption(node, 'WITH', parseExp);
            parseOption(node, 'MASK', parseClass, true);
            node.items = [];
            let w: string;
            while (w = parseWord()) {
                const kw = w.toUpperCase();
                const fn = itemKeywords[kw];
                if (fn) {
                    const n = new Node(kw);
                    fn(n);
                    parseChar(COMMA); // optional
                    node.items.push(n);
                } else {
                    pos -= w.length;
                    break;
                }
            }
            parseOption(node, 'AS', parseExp, true);
        }

        function parsePartBox(node: Node) {
            parseListbox(node);
            parseOption(node, 'AT', parseExp);
            parseOption(node, 'AS', parseExp, true);
        }

        function parseSrld(node: Node) {
            node.arg = parseExp(true);
            parseOption(node, 'FILTER', parseExp);
            parseKeyword('WITH', true);
            node.args = parseNodes(COMMA, 'ARG', n => {
                n.arg = parseExp(true);
                parseOption(n, 'AS', parseExp, true);
            });
            parseOption(node, 'SIZED', parseExps);
            parseOption(node, 'USING', parseClass);
        }

        const keywords: { [name: string]: (node: Node, ...args: any[]) => void; } = {
            // Tables
            FILE: parseFile,
            CLOSE(node) {
                let w = parseWord(true).toUpperCase();
                if (w === 'LOCAL' || w === 'GLOBAL') {
                    node.scope = w;
                    w = parseWord(true).toUpperCase();
                }
                node.target = w;
                if (!parseStatementSep()) {
                    node.classes = parseExps();
                }
            },
            LOGICCLOSE(node) {
                node.target = parseWord(true).toUpperCase();
                if (!parseStatementSep()) {
                    node.classes = parseExps();
                }
            },
            LOOK: parseRead,
            READ: parseRead,
            READLOCK: parseRead,
            LOCK: parseXLock,
            UNLOCK: parseXLock,
            LINK(node) {
                node.clas = parseClass(true);
                parseKeyword('WITH', true);
                node.items = parseNodes(COMMA, 'LINKITEM', n => {
                    n.key = parseKey(true);
                    n.outer = !parseChar(TILDE);
                    parseChar(EQ, true);
                    n.values = parseExps(SEMICOLON);
                });
                parseOption(node, 'AS', parseClass, true);
                parseOption(node, 'WHERE', parseWhere);
                parseOption(node, 'ORDER', parseOrder);
            },
            FLUSH(node) {
                node.clas = parseClass();
            },
            WRITEB(node) {
                node.clas = parseClass();
            },
            WRITE(node) {
                node.clas = parseClass();
            },
            REWRITEBYKEY(node) {
                node.key = parseKey();
                if (!parseStatementSep()) {
                    node.op = parsePositionExp();
                    if (!parseStatementSep()) {
                        node.values = parseExps(SEMICOLON);
                    }
                }
            },
            DELETEBYKEY(node) {
                node.key = parseKey();
                if (!parseStatementSep()) {
                    node.op = parsePositionExp();
                    if (!parseStatementSep()) {
                        node.values = parseExps(SEMICOLON);
                    }
                }
            },
            REWRITE(node) {
                node.key = parseKey();
                if (!parseStatementSep() && !ifContext()) {
                    node.op = parsePositionExp();
                    if (!parseStatementSep() && !ifContext()) {
                        node.values = parseExps(SEMICOLON);
                    }
                }
            },
            DELETE(node) {
                node.key = parseKey();
                if (parseKeyword('WHERE')) {
                    node.where = parseWhere();
                } else {
                    if (!parseStatementSep() && !ifContext()) {
                        node.op = parsePositionExp();
                        if (!parseStatementSep() && !ifContext()) {
                            node.values = parseExps(SEMICOLON);
                        }
                    }
                }
            },
            UPDATE(node) {
                node.clas = parseClass();
                parseOption(node, 'WHERE', parseWhere);
                parseKeyword('WITH', true);
                node.assignments = parseNodes(COMMA, 'ASSIGNUPDATE', n => {
                    n.lhs = parseTerm(true);
                    n.op = parseOperator();
                    if (!n.op || !n.op.isAssign) throw error('expected assignment op');
                    //parseChar(EQ);
                    n.rhs = parseExp(true);
                });
            },
            FILTER: parseFilterChoose,
            CHOOSE: parseFilterChoose,
            // Masks
            MASK: parseMask,
            TRANSMASK(node) {
                node.FROM = parseClass(true);
                parseKeyword('TO', true);
                node.TO = parseClass(true);
            },
            SETMOK(node) {
                parseAssign(node, true);
            },
            // Left list
            FILLBOX(node) {
                node.clas = parseTerm(true);
                node.hint = parseHint();
            },
            LEFTBOX: obsolete,
            SETLBOX(node) {
                node.clas = parseTerm(true);
            },
            DISLBOX: parseResultNode,
            PICK: parseResultNode,
            // Fields
            AFFZO: parseZoneOp,
            ENVZO: parseZoneOp,
            EFFZO: parseZoneOp,
            ACTZO: parseZoneOp,
            DISZO: parseZoneOp,
            GRIZO: parseZoneOp,
            CHGFMT: parseClassIdWith,
            CHGTBK: parseClassIdWith,
            CHGTZN: parseClassIdWith,
            CHGTFD: parseClassIdWith,
            // Chgstl [ classe ] [ liste_zones] With style
            CHGSTL(node) {
                node.clas = parseClass();
                if (!peekKeyword('WITH')) {
                    node.zones = parseNodes(COMMA, 'ZONE', n => {
                        if (isDigit(source.charCodeAt(pos))) {
                            // ex: Chgstl [M]15 With STYLE
                            // 15 is a bloc's number
                            n.exp = parseNumber(true);
                            n.indices = null;
                        } else {
                            // ex: Chgstl [M]F With STYLE
                            n.exp = parseDynName();
                            n.indices = parseParExps();
                        }
                    });
                }
                parseOption(node, 'WITH', parseExp, true);
            },
            TITCOL: parseTermAndList,
            DISCOMBO(node) {
                node.args = parseExps();
                parseOption(node, 'FROM', parseExp, true);
            },
            // Columns classe [ ( champ [, champ]) ]
            // Columns classe  With Mask( masque [, masque]) ]
            COLUMNS(node) {
                node.clas = parseClass(true);
                if (parseKeyword('WITH')) {
                    parseKeyword('MASK', true);
                    node.isMask = true;
                }
                if (parseChar(PAR_OPEN)) {
                    node.columns = parseList(COMMA, parseColumn, true);
                    parseChar(PAR_CLOSE, true);

                    if (parseKeyword('EXTENDED')) {
                        node.isExtended = true;
                    }
                }
            },
            // Files
            OPENI: parseOpen('r'),
            OPENO: parseOpen('w'),
            OPENIO: parseOpen('r+'),
            IOMODE(node) {
                node.mode = parseWord(true);
                node.value = parseExp(true);
                parseOption(node, 'USING', parseClass);
            },
            GETSEQ: parseXSeq,
            PUTSEQ: parseXSeq,
            RDSEQ(node) {
                node.exps = parseExps();
                parseOption(node, 'USING', parseTerm);
            },
            WRSEQ(node) {
                node.values = parseList(null, parseExp, false);
                if (!peekKeyword('USING')) node.sep = parseExp();
                parseOption(node, 'USING', parseClass);
            },
            SEEK(node) {
                let w = parseWord();
                if (w) {
                    switch (w = w.toUpperCase()) {
                        case 'FIRST':
                            if (parseChar(PLUS)) node.direction = +1;
                            //else throw error("Bad seek direction");
                            break;
                        case 'LAST':
                            if (parseChar(MINUS)) node.direction = -1;
                            //else throw error("Bad seek direction");
                            break;
                        case 'CURR':
                            if (parseChar(PLUS)) {
                                node.direction = +1;
                            } else if (parseChar(MINUS)) {
                                node.direction = -1;
                            } else {
                                throw error('Bad seek direction');
                            }
                            break;
                        default:
                            throw error('Bad seek option');
                    }
                } else {
                    w = 'CURR';
                    node.direction = +1;
                }
                node.mode = w;
                if (node.direction) node.value = parseExp(true);
                else node.value = 0;
                parseOption(node, 'USING', parseClass);
            },
            // Misc
            FIELD(node) {
                node.clas = parseClass();
                node.args = parseExps();
            },
            FORMULA(node) {
                node.arg = parseExp(true);
                parseOption(node, 'AS', parseClass);
            },
            // Report param = id_serveur with liste_param
            REPORT: parseSystInst,
            // Variables
            DEFAULT(node) {
                if (peekChar(BRA_OPEN)) {
                    node.classes = parseClasses(COMMA);
                } else {
                    node.scope = parseWord(true).toUpperCase();
                    switch (node.scope) {
                        case 'FILE':
                            node.file = parseExp(true);
                            break;
                        case 'MASK':
                            node.mask = parseExp(true);
                            break;
                    }
                }
            },
            GLOBAL: parseScope,
            LOCAL: parseScope,
            EXTERN: parseScope,
            ASSIGN: parseAssign,
            APPEND: parseAppend,
            // syntax allows only 2 -- ignore
            RAZ: parseExpsStatement,
            KILL: parseExpsStatement,
            INSA: parseInsDelA,
            DELA: parseInsDelA,
            SORTA(node) {
                const exp = parseExp(true);

                if (!(peekKeyword('ORDER') || peekStatementSep() || peekChar(COMMA))) {
                    node.rep = exp;
                    node.vars = [parseExp(true)];
                } else {
                    node.vars = [exp];
                }
                while (parseChar(COMMA)) {
                    node.vars.push(parseExp(true));
                }
                parseOption(node, 'ORDER', parseOrderSort);
            },
            // Calls
            CALL(node) {
                node.name = parseDynName();
                if (parseKeyword('WITH')) {
                    // Call Xxx With From Yyy is allowed
                    if (peekKeyword('FROM')) node.args = [];
                    else node.args = parseExps();
                } else {
                    node.args = parseParExps();
                }
                parseOption(node, 'FROM', parseDynName);
            },
            CALLMET: parseXMet('CALLMET'), // todo: check that it is a method call.
            FUNC: null,
            OPADXD: parseCallIu,
            CALLIU: parseCallIu,
            FUNCIU: null,
            // term, not statement
            SUBPROG: parseProg,
            FUNPROG: parseProg,
            VALUE: parseParameter,
            VARIABLE: parseParameter,
            CONST: parseParameter,
            END: parseEnd,
            // Labels
            GOSUB: parseGo,
            GOTO: parseGo,
            ONERRGO: parseGo,
            ONINTGO: parseGo,
            RETURN: parseEnd,
            RESUME: parseEmpty,
            // Events
            ONEVENT: parseOn,
            ONKEY: parseOn,
            // Interruptions
            // Sleep délai
            SLEEP: parseResultNode,
            DBGETNA: parseResultNode,
            INTER: parseResultNode,
            NOINTER: parseResultNode,
            // Flow control
            CASE(node) {
                node.expression = parseExp(true);
                node.chainType = 'CASE';
                blocks.push(node);
            },
            WHEN(node) {
                node.expressions = parseKeyword('DEFAULT') ? [] : parseExps();
                parseKeyword('THEN'); // optional
                node.chainType = 'CASE';
                branchChain(node, 'CASE');
            },
            ENDCASE(node) {
                branchChain(node, 'CASE', true);
            },
            IF(node) {
                node.condition = parseExp(true);
                parseKeyword('THEN'); // optional
                blocks.push(node);
                node.chainType = 'IF';
            },
            ELSIF(node) {
                node.condition = parseExp(true);
                parseKeyword('THEN'); // optional
                node.chainType = 'IF';
                branchChain(node, 'IF');
            },
            ELSE(node) {
                node.chainType = 'IF';
                branchChain(node, 'IF');
            },
            ENDIF(node) {
                branchChain(node, 'IF', true);
            },
            FOR(node) {
                function parseForTable(key: Node) {
                    node.key = key;

                    function parseWith() {
                        const w = parseWord(true).toUpperCase();

                        switch (w) {
                            case 'NOHINT':
                            case 'STABILITY':
                                node.stability = true;
                                break;
                            case 'LOCK':
                                node.lock = true;
                                break;
                            default:
                                throw error("bad 'WITH' clause: " + w);
                        }
                    }
                    parseOption(node, 'MAXROWS', parseExp);
                    node.hint = parseHint();
                    if (!node.hint && parseKeyword('WITH')) {
                        parseWith();
                    }
                    //if (parseKeyword('FROM')) node.from = parseExps(SEMICOLON);
                    //if (parseKeyword('TO')) node.to = parseExps(SEMICOLON);
                    parseOption(node, 'FROM', parseExps);
                    parseOption(node, 'TO', parseExps);
                    parseOption(node, 'WHERE', parseWhere);
                    parseOption(node, 'WITH', parseWith);
                }

                function parseForVar(key: Node) {
                    // if (key.abbrev || key.indices) throw error("invalid for syntax, expected identifier alone");
                    node.varName = key.field;
                    const exp = parseExp(true);

                    if (parseKeyword('TO')) {
                        if (key.letter) node.letter = key.letter;
                        node.from = exp;
                        node.to = parseExp(true);
                        if (parseKeyword('STEP')) {
                            node.step = parseExp(true);
                        }
                    } else {
                        node.ins = [exp];
                        while (parseChar(COMMA)) {
                            node.ins.push(parseExp(true));
                        }
                    }
                }

                function parseVarSQLDecl(n: Node, withUsing?: boolean) {
                    n.mode = n.mode || 'DEFAULT';

                    const kw = parseType(true);

                    //node.type = (node.tag === declKeywords.LIBELLE)?declKeywords.TINYINT : node.tag ;

                    if (kw === 'LIBELLE') n.type = 'TINYINT';
                    else if (kw === 'FLOAT') n.type = 'DECIMAL';
                    //else if (node.tag === 'DOUBLE') node.type='DECIMAL';
                    else if (kw === 'DOUBLE') n.type = 'DOUBLE'; else if (kw === 'SCHAR') n.type = 'CHAR'; else n.type = kw;

                    n.name = parseWord(true);
                    n.lens = parseParExps();
                    if (n.type === 'CHAR' && peekChar(PAR_OPEN)) {
                        n.ranges = parseParExps();
                    }
                }

                function parseForSql(n: Node) {
                    // undocumented
                    /*node.vars = parseNodes(COMMA, 'SQLDECL', n => {
            n.type = parseWord(true);
            n.exp = parseExp(true);
            n.indices = parseParExps();
        });*/
                    n.vars = parseNodes(COMMA, 'SQLDECL', parseVarSQLDecl);
                    parseChar(PAR_CLOSE, true);
                    parseOption(n, 'FROM', parseExp, true);
                    parseOption(n, 'SQL', parseExp, true);
                    parseOption(n, 'AS', parseClass, true);
                }
                if (parseChar(PAR_OPEN)) {
                    node.sql = new Node('SQL');
                    parseForSql(node.sql);
                } else {
                    const key = parseKey(true);
                    if (parseChar(EQ)) parseForVar(key);
                    else parseForTable(key);
                }
                startLoop(node);
            },
            NEXT(node) {
                if (!peekStatementSep()) node.exp = parseExp(true);
                branchLoop(node, 'FOR');
            },

            REPEAT(node) {
                startLoop(node);
            },
            UNTIL(node) {
                node.condition = parseExp(true);
                branchLoop(node, 'REPEAT');
            },
            WHILE(node) {
                node.condition = parseExp(true);
                startLoop(node);
            },
            WEND(node) {
                branchLoop(node, 'WHILE');
            },
            BREAK(node) {
                node.level = parseExp();
                insideLoop(node);
            },
            // Transactions
            TRBEGIN(node) {
                node.vcs = parseVCs();
            },
            COMMIT: parseEmpty,
            ROLLBACK: parseEmpty,
            // SQL
            ANASQL: parseAnaExecSql,
            EXECSQL: parseAnaExecSql,
            /* Sql */
            // LDAP
            OPLDAP: parseRptX,
            CLLDAP: parseRptX,
            SRLDAPBS: parseSrld,
            SRLDAPLV: parseSrld,
            SRLDAPTR: parseSrld,
            NXLDAP(node) {
                parseOption(node, 'SIZED', parseParExps);
                parseOption(node, 'USING', parseExp);
            },
            // Misc
            ASKUI: parseRetEqExpWith,
            BLK: obsolete,
            CALLILOG: obsolete,
            CALLOCX: parseRetEqExpWith,
            CALLUI: parseRetEqExpWith,
            CALLJS: parseCallJs,
            DBGAFF: parseEmpty,
            EDI: parseDynNameStatement,
            GETUI: parseRetEqExpWith,
            INFBOX: parseInfBox,
            // Listimp param = id_serveur
            LISTIMP: parseRetEqExpWith,
            MEN: parseDynNameStatement,
            NAP: parseDynNameStatement,
            PIKLTB: obsolete,
            POKLTB: obsolete,
            PMT: parseDynNameStatement,
            REB: parseDynNameStatement,
            RUN: parseDynNameStatement,
            SELDEST: parseRetEqExpWith,
            SELIMP: parseRetEqExpWith,
            SEND: parseExpWith,
            SETFCT: parseResultNode,
            SETLOB: parseAssign,
            SETMDU: parseResultNode,
            SYSTEM: parseSystemExp,
            // unused
            ENABLE: parseXable,
            DISABLE: parseXable,
            ADDMEN: parseAddX,
            ADDITM: parseAddX,
            // Inftxt expr_c At no_case
            INFTXT(node) {
                node.exp = parseExp(true);
                parseOption(node, 'AT', parseExp, true);
            },
            INFIMG(node) {
                node.exp = parseExp(true);
                parseOption(node, 'TITLED', parseExp);
                parseOption(node, 'CODED', parseExp);
            },
            // undocumented
            HLPBOX: parseResultNode,
            SETMODE(node) {
                if (!parseStatementSep()) {
                    node.names = parseExps();
                }
            },
            BOXACT(node) {
                node.clas = parseClass();
                parseOption(node, 'FOLDER', parseExps);
            },
            BOXINP(node) {
                node.clas = parseClass();
                parseOption(node, 'USING', parseExps);
            },
            INPBOX: parseInpBox,
            MESBOX: parseInpBox,
            ERRBOX(node) {
                node.arg = parseExp(true);
                parseOption(node, 'TITLED', parseExp);
                parseOption(node, 'SLEEP', parseExp);
                parseOption(node, 'USING', parseExp);
            },
            RPTSTAT: parseRptX,
            RPTFILE: parseRptX,
            GENWS(node) {
                node.name = parseWord(true);
                parseOption(node, 'USING', parseExp);
                parseOption(node, 'TITLED', parseExp);
            },
            GENASMX(node) {
                node.name = parseWord(true);
                parseOption(node, 'AS', parseTerm);
                parseOption(node, 'USING', parseExp);
            },
            CONVXML(node) {
                node.name = parseWord(true);
                parseOption(node, 'TO', parseExp, true);
                parseOption(node, 'USING', parseExp);
                parseOption(node, 'FILTER', parseExp);
            },
            SUPLI(node) {
                parseOption(node, 'WITH', parseDynName);
                parseExp(); // ??
            },
            SELBOX: parseSelBox,
            QSTBOX: parseSelBox,
            WRNBOX: parseSelBox,
            ENDBOX: parseSelBox,
            DBGBOX: parseDbgBox,
            OPSOCK: parseRptX,
            SETSTC: parseSetStc,
            SETINSTANCE: parseSetStc,
            TITLED: parseClassIdWith,
            INSLI: parseClassIdWith,
            SAIZO: parseClassIdWith,
            FREE: parseResultNode,
            FREEINSTANCE: parseResultNode,
            FREEZEINSTANCE: parseResultNode,
            FREEGROUP: parseResultNode,
            SETGUS: parseResultNode,
            BOXCLR: parseResultNode,
            FMETHOD: parseResultNode,
            // non statements
            WHERE: null,
            HINT: null,
            USING: null,
            ORDER: null,
            WITH: null,
            NEWSTC: null,
            NEWINSTANCE: null,
            NOT: null,
            FIRST: null,
            LAST: null,
            CURR: null,
            PREV: null,
            BUTTON: null,
            CODED: null,
            AS: null,
            FROM: null,
            TO: null,
            FOLDER: null,
            LISTBOX: null,
            TREEBOX: null,
            PICKBOX: parsePartBox,
            SYRSEND: parseSyrSend,
        };
        const optKeywords: { [name: string]: boolean; } = {
            FROM: true,
            WITH: true,
            WHERE: true,
            ORDER: true,
            KEY: true,
            USING: true,
            TO: true,
            STEP: true,
            THEN: true,
            SIZED: true,
            AS: true,
            MAXROWS: true,
            HINT: true,
            NOHINT: true,
            AT: true,
            SQL: true,
            ALLOCGROUP: true,
            BY: true,
            ASC: true,
            DESC: true,
            //LOCKWAIT: true,
            STARTING: true,
            FOLDER: true,
            BUTTON: true,
            CODED: true,
            EXTENDED: true,
            FIRST: true,
            LAST: true,
        };

        this.parse = function parse() {
            const t0 = Date.now();
            const node = new Node('SCRIPT');

            statements = node.statements = [];
            //addLabel("MAIN");
            parseScript(node);
            node.progs = progs;
            node.labels = labels;
            return {
                node: node,
                lines: line,
                millis: Date.now() - t0,
            };
        };
        this.parseExp = parseExp;
    }
}