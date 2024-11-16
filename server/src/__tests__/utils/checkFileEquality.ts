import { loadFile } from "../mocks/utils/loadFile";

export function areFilesEqual(dirname: string, responseImg: string, filePath: string) {
  const expectedFile = loadFile(dirname, filePath);
  const b64Offset = responseImg.indexOf("base64");
  expect(responseImg.slice(b64Offset + 7)).toBe(
    expectedFile.toString("base64"),
  );
}
