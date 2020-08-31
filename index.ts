import * as fs from 'mz/fs';
import { Parser } from './lib/parser';

function handle(error: any) {
   console.log('error:', JSON.stringify(error, null, '\t'));
}
//test not finish
async function readFile(filename: string) {
   console.log(`readFile:${filename}`);
   const contents = fs.readFileSync(filename, 'utf8');
   console.log('contents:\n' + contents);
   const value = new Parser(contents).parse();
   console.log(value); //detail
   console.log(JSON.stringify(value)); //here
   const searchVal = ['value'];
   const getTitle=function(json,val){
      for (const key in json) {
        const titles= json[key];
        for (const tit in titles) {
          const names=titles[tit];
          for (const name in names) {
            const stringy=names[name];
            if(stringy===val)
              return tit;
          }
        }
      }
   };
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
   console.log(`isDir:${path}`);
   try {
      const stat = fs.lstatSync(path);
      return stat.isDirectory();
   } catch (e) {
      // lstatSync throws an error if path doesn't exist
      return false;
   }
}

async function main(args: string[]) {
   console.log('----------------------------ici');
   console.log(args[2]);
   console.log('----------------------------ici');
   if (args.length >= 3) {
      if (isDir(args[2])) {
         console.log(readDir(args[2]).catch(handle));
         await readDir(args[2]).catch(handle);
      } else {
         readFile(args[2]).catch(handle);
      }
   }
}
main(process.argv).catch(handle);