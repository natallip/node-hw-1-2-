const fs = require('fs');
const path = require('path');

const copyFiles = (newDir, source, array) => {
  const Dir = path.normalize(newDir);
  fs.mkdirSync(Dir);

  fs.readdir(Dir, () => {
    array.forEach((file) => {
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
  });
};
module.exports = copyFiles;
