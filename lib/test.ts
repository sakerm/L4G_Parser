import { Parser } from './parser'
import * as fs from 'fs'

let str: string[] = [];
let copy: string[] = [];
let count: number = 0

fs.readdir("./file/test", (err, files) => {
  files.forEach(file => {
    copy[count] =  fs.readFileSync("./file/test/" + files[count], 'utf8').toString();
    copy[count].split('\n').forEach(function (line) {
        str[count] += line;
    })
    console.log(files[count]+"---------------------\n"+JSON.stringify(new Parser(str[count]).parse()) + "\n-------------------------------------------\n")
    count += 1;
  });
})