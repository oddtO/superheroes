import pool from "../pool";
import { sql } from "@pgtyped/runtime";
import {
  IAddSuperheroMainTableQuery,
  IGetSuperheroAllDataQuery,
  IGetSuperheroAllDataResult,
  IGetSuperheroesQuery,
  IUpdateSuperheroQuery,
  IUpdateSuperheroResult,
} from "./superheroes.types";
import { INewSuperhero, IUpdatedSuperhero } from "../../types/types";
import { createDataUrl } from "../../utils/createDataUrl";
import { imagesDb } from "./images";
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
    await pool.query("BEGIN");
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
    await imagesDb.addImagesToSuperhero(newSuperhero.id, superheroData);

    await pool.query("COMMIT");
    const newSuperheroAllData = await this.getSuperheroAllData(newSuperhero.id);
    return newSuperheroAllData;
  }
  async updateSuperhero(superheroData: IUpdatedSuperhero) {
    await pool.query("BEGIN");
    const updateSuperhero = sql<IUpdateSuperheroQuery>`
      UPDATE superheroes
      SET
        nickname = $nickname,
        real_name = $real_name,
        origin_description = $origin_description,
        superpowers = $superpowers,
        catch_phrase = $catch_phrase
      WHERE
        id = $id
      RETURNING
        *;
    `;
    const updatedSuperheroWrapper = await updateSuperhero.run(
      {
        id: superheroData.id,
        nickname: superheroData.nickname,
        real_name: superheroData.real_name,
        origin_description: superheroData.origin_description,
        superpowers: superheroData.superpowers,
        catch_phrase: superheroData.catch_phrase,
      },
      pool,
    );
    const updatedSuperhero: IUpdateSuperheroResult | undefined =
      updatedSuperheroWrapper[0];

    if (!updatedSuperhero) {
      return null;
    }
    await imagesDb.removeImagesFromSuperhero(
      updatedSuperhero.id,
      superheroData,
    );

    await imagesDb.addImagesToSuperhero(updatedSuperhero.id, superheroData);

    const newFullSuperhero = (await this.getSuperheroAllData(
      updatedSuperhero.id,
    )) as Exclude<IGetSuperheroAllDataResult, null>;

    await pool.query("COMMIT");
    return newFullSuperhero;
  }
}

export const superheroesDb = new Superheroes();
