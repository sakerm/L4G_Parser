import * as fs from 'fs';
import { Parser } from './lib/parser';

let str: any;

console.log(process.argv);
fs.readFileSync(process.argv[2], 'utf8').toString().split('\n').forEach(function (line) {
   // if (line.indexOf('#') == -1) {
      str += '\n'
      str += line;
   // }
});

let value: any;
value = new Parser(str).parse();
console.log(JSON.stringify(value));
//console.log(JSON.stringify(str))

//const parsed = new Parser('NBRROL += 1').parse();
