"use strict";
exports.__esModule = true;
var parser_1 = require("./lib/parser");
var fs = require("fs");
var str = [];
var copy = [];
var count = 0;
var value;
var file;
fs.readFile('./file/ASYRADELETE.src', 'utf8', function (err, files) {
    file = files.split('\n');
    while (file.length != count) {
        value = new parser_1.Parser(file[count]).parse();
        console.log(JSON.stringify(value));
        count += 1;
    }
    ;
});
