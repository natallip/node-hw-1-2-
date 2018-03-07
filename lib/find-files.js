const fs = require('fs');
const path = require('path');
const util = require('util');
let array = [];

const findFiles = async source => {
  if (!source) {
    throw new Error('Нет такой папки');
  }
  const f = util.promisify(fs.readdir);
  const files = await f(source);
  files.forEach(item => {
    const filePath = path.join(source, item);
    const state = fs.statSync(filePath);
    if (state.isDirectory()) { // это папка
      findFiles(filePath);
    } else { // это файл
      let folder = item.toString().charAt(0).toUpperCase();
      array.push({ file: item, folder, source: filePath });
    }
  });
  return array;
};
module.exports = findFiles;
