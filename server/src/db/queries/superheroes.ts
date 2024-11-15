import pool from "../pool";
import { sql } from "@pgtyped/runtime";
import {
  IAddSuperheroImagesParams,
  IAddSuperheroImagesQuery,
  IAddSuperheroMainTableQuery,
  IGetSuperheroAllDataQuery,
  IGetSuperheroAllDataResult,
  IGetSuperheroesQuery,
} from "./superheroes.types";
import { INewSuperhero } from "../../types/types";
import { createDataUrl } from "../../utils/createDataUrl";
class Superheroes {
  getSuperheroesWithTheirFirstImage() {
    const getSuperheroes = sql<IGetSuperheroesQuery>`
      SELECT
        s.id,
        s.nickname,
        s.real_name,
        s.origin_description,
        s.superpowers,
        s.catch_phrase,
        i.image_data AS first_image,
        i.mime_type,
        i.original_filename,
        i.id AS image_id
      FROM
        superheroes s
        LEFT JOIN (
          SELECT DISTINCT
            ON (superhero_id) *
          FROM
            images_superheroes
          ORDER BY
            superhero_id
        ) i ON s.id = i.superhero_id;
    `;

    return getSuperheroes.run(undefined, pool);
  }

  async getSuperheroAllData(id: string) {
    const getSuperheroAllData = sql<IGetSuperheroAllDataQuery>`
      SELECT
        s.id,
        s.nickname,
        s.real_name,
        s.origin_description,
        s.superpowers,
        s.catch_phrase,
        array_agg(i.id) AS image_ids,
        array_agg(i.image_data) AS images_b64,
        array_agg(i.original_filename) AS image_filenames,
        array_agg(i.mime_type) AS image_types
      FROM
        superheroes s
        LEFT JOIN images_superheroes i ON s.id = i.superhero_id
      WHERE
        s.id = $id
      GROUP BY
        s.id,
        s.nickname,
        s.real_name,
        s.origin_description,
        s.superpowers,
        s.catch_phrase;
    `;
    const superheroWrapper = await getSuperheroAllData.run({ id }, pool);
    if (superheroWrapper.length === 0) {
      return null;
    } else {
      return superheroWrapper[0];
    }
  }
  async addSuperhero(superheroData: INewSuperhero) {
    pool.query("BEGIN");
    const addSuperheroMainTable = sql<IAddSuperheroMainTableQuery>`
      INSERT INTO
        superheroes (
          nickname,
          real_name,
          origin_description,
          superpowers,
          catch_phrase
        )
      VALUES
        (
          $nickname,
          $real_name,
          $origin_description,
          $superpowers,
          $catch_phrase
        )
      RETURNING
        *;
    `;
    const addSuperheroImages = sql<IAddSuperheroImagesQuery>`
      INSERT INTO
        images_superheroes (
          superhero_id,
          image_data,
          original_filename,
          mime_type
        )
      VALUES $$images_superheroes(superhero_id, image_data, original_filename, mime_type);
    `;

    const newSuperheroWrapper = await addSuperheroMainTable.run(
      {
        nickname: superheroData.nickname,
        real_name: superheroData.real_name,
        origin_description: superheroData.origin_description,
        superpowers: superheroData.superpowers,
        catch_phrase: superheroData.catch_phrase,
      },
      pool,
    );
    const newSuperhero = newSuperheroWrapper[0];

    const newImagesParams = superheroData.images_b64?.map((image, i) => {
      return {
        superhero_id: newSuperhero.id,
        image_data: superheroData.images_b64?.[i],
        original_filename: superheroData.image_filenames?.[i] ?? null,
        mime_type: superheroData.image_types?.[i] ?? null,
      };
    });
    if (superheroData.images_b64?.length != 0) {
      await addSuperheroImages.run(
        {
          images_superheroes: newImagesParams!,
        },
        pool,
      );
    }

    pool.query("COMMIT");
    const newSuperheroAllData = await this.getSuperheroAllData(newSuperhero.id);
    return newSuperheroAllData;
  }
}

export const superheroesDb = new Superheroes();
