import { Parser } from './lib/parser'
import * as fs from 'fs'

let str: string[] = [];
let copy: string[] = [];
let count: number = 0
let value
let file;

fs.readFile('./file/ASYRADELETE.src', 'utf8', function (err, files) {
  file = files.split('\n')
  while (file.length != count) {
    value = new Parser(file[count]).parse();
    console.log(JSON.stringify(value))
    count += 1
  };
})