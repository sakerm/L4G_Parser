import { Parser } from '../parser'
import * as fs from 'fs'

let str: any;

fs.readFileSync('./file/ASYRADELETE.src', 'utf8').toString().split('\n').forEach(function (line) {
   // if (line.indexOf('#') == -1) {
        str += line;
   // }
})

console.log(JSON.stringify(str))
let value
value = new Parser(str).parse();
console.log(JSON.stringify(value))

//console.log(JSON.stringify(str))

//const parsed = new Parser('NBRROL += 1').parse();