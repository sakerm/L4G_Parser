import * as fs from 'mz/fs';

// import { Parser } from './lib/parser';

const readFile =  async (filename:string) => {
   console.log(`readFile:${filename}`);
   const lines = fs.readFileSync(filename, 'utf8').split('\n'); 
   const contents = lines.reduce( (r:string, line:string) => {
         r += line;
         return r;
   }, '' as string);

   console.log('contents:\n'+contents);
   // const value = new Parser(contents).parse();
   // console.log(JSON.stringify(value));
};

const readDir = async (dirname:string) => {
   console.log(`readDir:${dirname}`);
   const filenames = await fs.readdir(dirname);
   filenames.forEach((filename:string) => {
      readFile(`${dirname}${filename}`);
   });
};

function is_dir(path) {
   try {
       const stat = fs.lstatSync(path);
       return stat.isDirectory();
   } catch (e) {
       // lstatSync throws an error if path doesn't exist
       return false;
   }
}

console.log(process.argv);

(async (args:string[]) => {
   if (is_dir(args[2])) {
      await readDir(args[2]);
   } else {
      await readFile(args[2]);
   }
})(process.argv);