import { Parser } from '../parser'
import * as fs from 'fs'

let str: any;

fs.readFileSync('./file/ASYRADELETE.src', 'utf8').toString().split('\n').forEach(function (line) {
    str = new Parser(line).parse();
    console.log(JSON.stringify(str) + "\n---------------------")
})

console.log(JSON.stringify(str))

//const parsed = new Parser('NBRROL += 1').parse();