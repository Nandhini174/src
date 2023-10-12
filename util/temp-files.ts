const fs = require('fs');

const tmpDir = process.cwd() + '/tmp';
export function readTmpFileSync(file: string) {
  const filePath = tmpDir + '/' + file;
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  return fs.readFileSync(filePath);
}

export function writeTmpFileSync(file: string, contents: string) {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }
  const filePath = tmpDir + '/' + file;
  fs.writeFileSync(filePath, contents);
}
