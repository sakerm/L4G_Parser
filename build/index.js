"use strict";
exports.__esModule = true;
var parser_1 = require("./lib/parser");
var fs = require("fs");
var str;
console.log(process.argv);
fs.readFileSync(process.argv[2], 'utf8').toString().split('\n').forEach(function (line) {
    // if (line.indexOf('#') == -1) {
    str += line;
    // }
});
console.log(JSON.stringify(str));
var value;
value = new parser_1.Parser(str).parse();
console.log(JSON.stringify(value));
//console.log(JSON.stringify(str))
//const parsed = new Parser('NBRROL += 1').parse();
