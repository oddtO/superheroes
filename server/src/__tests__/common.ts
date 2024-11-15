import pool from "../db/pool";

export const DATAURL_BUFFER_OFFSET = 23;
export async function commonAfterAll() {
  await pool.end();
}

export async function commonBeforeEach() {
  await pool.query("BEGIN");

  await pool.query(
    "TRUNCATE TABLE images_superheroes RESTART IDENTITY CASCADE",
  );
  await pool.query(
    "TRUNCATE TABLE superheroes RESTART IDENTITY CASCADE",
  );
}

export async function commonAfterEach() {
  await pool.query("ROLLBACK");
}
