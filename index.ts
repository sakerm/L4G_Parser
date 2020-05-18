import * as fs from 'fs';
import { Parser } from './lib/parser';

let str: any;

function readFiles(dirname) {
   fs.readdir(dirname, function(err, filenames) {
     if (err) {
       return;
     }
     filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          return;
        }
        fs.readFileSync(dirname+filename, 'utf8').toString().split('\n').forEach(function (line) {
               str += line;
         });
         console.log(str + '\n' + "-------------------"+filename +"-----------------------")
         str = '\0'
      });
    });
  });
}

function readFile(filename) {
   fs.readFileSync(filename, 'utf8').toString().split('\n').forEach(function (line) {
      // if (line.indexOf('#') == -1) {
           str += line;
      // }
   });
   return(str);
}

function is_dir(path) {
   try {
       var stat = fs.lstatSync(path);
       return stat.isDirectory();
   } catch (e) {
       // lstatSync throws an error if path doesn't exist
       return false;
   }
}

if (is_dir(process.argv[2]) == true) {
   readFiles(process.argv[2]);
}
else {
   str = readFile(process.argv[2])
   console.log(JSON.stringify(str));
   let value: any;
   value = new Parser(str).parse();
   console.log(JSON.stringify(value));
}


//console.log(JSON.stringify(str))

//const parsed = new Parser('NBRROL += 1').parse();
