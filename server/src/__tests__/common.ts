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
