const fs = require('fs');
const path = require('path');

const deleteFolder = (source) => {
  const files = fs.readdirSync(source);
  files.forEach(item => {
    let filePath = path.join(source, item);
    let state = fs.statSync(filePath);
    if (state.isDirectory()) {
      return deleteFolder(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  });
  fs.rmdirSync(source);
};
module.exports = deleteFolder;
