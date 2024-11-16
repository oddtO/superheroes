import fs from "fs";
import path from "path";
export function loadFile(dirname: string, filePath: string) {
  const fileFullPath = path.join(dirname, filePath);
  const buffer = fs.readFileSync(fileFullPath);
  return buffer;
}
