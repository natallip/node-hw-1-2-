const yargs = require('yargs');
const findFiles = require('./lib/find-files.js');
const copyFiles = require('./lib/copy-files.js');
const deleteFiles = require('./lib/delete-files.js');
// const util = require('util');

const argv = yargs
  .usage('main [options]')
  .demand('f')
  .nargs('f', 3)
  .describe('f', 'Укажите: имя исходной папки, имя новой папки, надо ли удалить исходную папку (yes/no)')
  .alias('f', 'folder')
  .argv;

const phrase = argv.f;
const source = phrase[0];
const newFolder = phrase[1];
const delFolder = phrase[2];

async function main () {
  try {
    const array = await findFiles(source);
    await copyFiles(newFolder, array);
    if (/^y(es)?$/i.test(delFolder)) {
      await deleteFiles(source);
      console.log('Operation is completed. The source folder was deleted');
      process.exit(0);
    }
    console.log('Operation is completed. The source folder is not deleted');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
main();
// const array = findFiles(source, (error) => {
//   if (error) {
//     console.log(error);
//     process.exit(1);
//   }
// });
// // console.log(111, array);
// copyFiles(newFolder, array, (error) => {
//   if (error) {
//     console.log(error);
//     process.exit(1);
//   }
// });
// if (/^y(es)?$/i.test(delFolder)) {
//   deleteFiles(source, (error) => {
//     if (error) {
//       console.log(error);
//       process.exit(1);
//     }
//   });
//   console.log('Operation is completed. The source folder was deleted');
//   process.exit(0);
// }
// console.log('Operation is completed. The source folder is not deleted');
// // process.exit(0);
