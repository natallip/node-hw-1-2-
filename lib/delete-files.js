const fs = require('fs');
const path = require('path');
// const util = require('util');

const deleteFolder = source => {
  // const files = util.promisify(fs.readdir);
  // const f = await files(source);
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
