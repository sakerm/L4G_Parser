import * as fs from 'mz/fs';
import { Parser } from './lib/parser';
import { check_parameter } from './lib/checkparse';

function handle(error: any) {
   console.log('error:', JSON.stringify(error, null, '\t'));
}
//test not finish
async function readFile(filename: string) {
   console.log(`readFile:${filename}`);
   const contents = fs.readFileSync(filename, 'utf8');
   console.log('contents:\n' + contents);
   const value = new Parser(contents).parse();
   console.log(JSON.stringify(value));
   var searchVal = ['value'];
   var getTitle=function(json,val){
      for (var key in json) {
        var titles= json[key];
        for (var tit in titles) {
          var names=titles[tit];
          for (var name in names) {
            var string=names[name];
            if(string===val)
              return tit;
          }
        }
    }
    }
    
    searchVal.forEach(function(valToSearch){
       console.log(getTitle(JSON.stringify(value),valToSearch));
    });
    //testnot finish
}

async function readDir(dirname: string) {
   console.log(`readDir:${dirname}`);
   const filenames = await fs.readdir(dirname);
   filenames.forEach((filename: string) => {
      const path = `${dirname}${filename}`;
      if (!isDir(path)) {
         readFile(`${dirname}${filename}`).catch(handle);
      }
   });
}

function isDir(path: string): boolean {
   try {
      const stat = fs.lstatSync(path);
      return stat.isDirectory();
   } catch (e) {
      // lstatSync throws an error if path doesn't exist
      return false;
   }
}

async function main(args: string[]) {
   if (args.length >= 2) {
      if (isDir(args[2])) {
         await readDir(args[2]).catch(handle);
      } else {
         await readFile(args[2]).catch(handle);
      }
   }
}
main(process.argv).catch(handle);