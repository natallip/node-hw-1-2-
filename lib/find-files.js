const fs = require('fs');
const path = require('path');
let array = [];

const findFiles = (source, callback) => {
  if (!source) {
    const error = { Error: 'Нет такой папки' };
    return callback(error);
  }
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
  return array;
};

module.exports = findFiles;
