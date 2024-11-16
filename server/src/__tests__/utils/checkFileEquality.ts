import { loadFile } from "../mocks/utils/loadFile";

export function areFilesEqual(dirname: string, responseImg: string, filePath: string) {
  const expectedFile = loadFile(dirname, filePath);
  const b64Offset = responseImg.indexOf("base64");
  expect(responseImg.slice(b64Offset + 7)).toBe(
    expectedFile.toString("base64"),
  );
}
import pool from "../db/pool";
import { emptyDbState } from "../db/__mocks__/pool";

/* export async function commonAfterAll() {
  await pool.end();
}

export async function commonBeforeEach() {
  emptyDbState.restore();
  // await pool.query(
  //   "TRUNCATE TABLE images_superheroes RESTART IDENTITY CASCADE",
  // );
  // await pool.query(
  //   "TRUNCATE TABLE superheroes RESTART IDENTITY CASCADE",
  // );
}

export async function commonAfterEach() {} */
