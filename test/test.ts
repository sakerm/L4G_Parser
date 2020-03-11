import { Parser } from '../parser'
import * as fs from 'fs'

let str: any;

let copy = fs.readFileSync('./file/ASYRADELETE.src', 'utf8').toString()


copy.split('\n').forEach(function (line) {
    if (line.indexOf('#') != -1)
      line = line.slice(0, line.indexOf('#'))
    str += line;
})

let value: any
value = new Parser(str).parse();
console.log(JSON.stringify(value))

//console.log(JSON.stringify(str))

//const parsed = new Parser('NBRROL += 1').parse();