"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("../parser");
var fs = require("fs");
var str;
var copy = fs.readFileSync('./file/ASYRADELETE.src', 'utf8').toString();
copy.split('\n').forEach(function (line) {
    if (line.indexOf('#') != -1)
        line = line.slice(0, line.indexOf('#'));
    str += line;
});
var value;
value = new parser_1.Parser(str).parse();
console.log(JSON.stringify(value));
//console.log(JSON.stringify(str))
//const parsed = new Parser('NBRROL += 1').parse();
