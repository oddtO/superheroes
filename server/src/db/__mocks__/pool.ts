import { newDb } from "pg-mem";
import base64 from "base-64";

import { DataType, FunctionDefinition } from "pg-mem";
import { Buffer } from "buffer"; // Node.js buffer module

const db = newDb();
db.public.many(`



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

// Register the ENCODE function in pg-mem
db.public.registerFunction({
  name: "encode",
  args: [DataType.bytea, DataType.text],
  returns: DataType.text,
  implementation: (input: Buffer, format: string) => {
    console.log("INPUT: ", input);
    if (format === "base64") {
      return input.toString("base64"); // Convert buffer to Base64
    }
    throw new Error(`Unsupported format: ${format}`);
  },
});
const pg = db.adapters.createPg();
const pool = new pg.Pool();
export default pool;
