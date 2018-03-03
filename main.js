const readline = require('readline');
const findFiles = require('./lib/find-files.js');
const copyFiles = require('./lib/copy-files.js');
const deleteFiles = require('./lib/delete-files.js');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Имя исходной папки?', source => {
  const array = findFiles(source, (error) => {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  });
  rl.question('Имя новой папки?', (answer) => {
    copyFiles(answer, source, array, (error) => {
      if (error) {
        console.log(error);
        process.exit(1);
      }
    });
    rl.question('Удалить старую папку? (Yes/No)?', (answer) => {
      if (/^y(es)?$/i.test(answer)) {
        deleteFiles(source, (error) => {
          if (error) {
            console.log(error);
            process.exit(1);
          }
        });
        console.log('Operation is completed. The source folder was deleted');
        process.exit(0);
      }
      console.log('Operation is completed. The source folder is not deleted');
      rl.close();
    });
  });
});
