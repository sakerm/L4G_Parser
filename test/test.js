"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("../parser");
var fs = require("fs");
var str;
fs.readFileSync('./file/ASYRADELETE.src', 'utf8').toString().split('\n').forEach(function (line) {
    str = new parser_1.Parser(line).parse();
    console.log(JSON.stringify(str) + "\n---------------------");
});
console.log(JSON.stringify(str));
//const parsed = new Parser('NBRROL += 1').parse();
