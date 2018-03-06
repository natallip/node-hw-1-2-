const fs = require('fs');
const path = require('path');

const copyFiles = async (newFolder, array) => {
  // console.log(222, array);
  const arr = await array;
  console.log(444, arr.length);
  // console.log(333, arr);
  const Dir = path.normalize(newFolder);
  fs.mkdirSync(Dir);
  arr.forEach(file => {
    let folder = path.join(Dir, file.folder);
    let newPath = path.join(Dir, file.folder, file.file);
    let currentPath = file.source;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    fs.link(currentPath, newPath, error => {
      if (error) console.log(error);
    });
  });

};
module.exports = copyFiles;
