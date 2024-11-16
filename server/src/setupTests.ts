import pool from "./db/pool";
import dotenv from "dotenv";
// add all jest-extended matchers
import * as matchers from 'jest-extended';
expect.extend(matchers);



dotenv.config({ path: "../.env.test" });
global.beforeAll(async () => {
  await pool.query(
    "TRUNCATE TABLE images_superheroes RESTART IDENTITY CASCADE;",
  );
  await pool.query("TRUNCATE TABLE superheroes RESTART IDENTITY CASCADE;");
  await pool.query(`

CREATE TABLE IF NOT EXISTS superheroes (
    id bigint GENERATED ALWAYS AS IDENTITY,
    nickname text NOT NULL,
    real_name text NOT NULL,
    origin_description text NOT NULL,
    superpowers text NOT NULL,
    catch_phrase text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS images_superheroes (
    id bigint GENERATED ALWAYS AS IDENTITY,
    superhero_id bigint NOT NULL,
    image_data text NOT NULL,
    mime_type text NOT NULL,
    original_filename text NOT NULL,
    PRIMARY KEY (id, superhero_id),
    FOREIGN KEY (superhero_id) REFERENCES superheroes (id)
);
`);
});
global.beforeEach(async () => {
  await pool.query("BEGIN;");
});

global.afterEach(async () => {
  await pool.query("ROLLBACK;");
  await pool.query(
    "TRUNCATE TABLE images_superheroes RESTART IDENTITY CASCADE;",
  );
  await pool.query("TRUNCATE TABLE superheroes RESTART IDENTITY CASCADE;");
});
global.afterAll(async () => {
  await pool.end();
});
