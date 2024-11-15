import { DATAURL_BUFFER_OFFSET } from "../common";
import { loadFile } from "../mocks/utils/loadFile";

// @ts-expect-error: testing
export function areFilesEqual(dirname, responseImg, filePath) {
  const expectedFile = loadFile(dirname, filePath);
  const b64Offset = responseImg.indexOf("base64");
  expect(responseImg.slice(b64Offset + 7)).toBe(
    expectedFile.toString("base64"),
  );
}
