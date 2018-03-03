const fs = require('fs');
const path = require('path');
let array = [];

const readDir = (source, callback) => {
  if (!source) {
    const error = { Error: 'Нет такой папки' };
    return callback(error);
  }
  const files = fs.readdirSync(source);
  if (!files.length) {
    const error = { Error: 'The folder is empty' };
    return callback(error);
  }
  const findFiles = (source) => {
    const files = fs.readdirSync(source);
    files.forEach(item => {
      let filePath = path.join(source, item);
      let state = fs.statSync(filePath);
      if (state.isDirectory()) {
        // это папка
        findFiles(filePath);
      } else {
        // это файл
        let folder = item.toString().charAt(0).toUpperCase();
        array.push({ file: item, folder, source: filePath });
      }
    });
  };
  findFiles(source);
  return array;
};

module.exports = readDir;
