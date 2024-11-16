import { sql } from "@pgtyped/runtime";
import pool from "../pool";
import { IAddSuperheroImagesQuery, IRemoveImagesQuery } from "./images.types";
import { IGetSuperheroAllDataResult } from "./superheroes.types";
import { INewSuperhero, IUpdatedSuperhero } from "../../types/types";
import { ApiError } from "../../exceptions/api-error";
class Images {
  async addImagesToSuperhero(
    superheroId: string,
    superheroData: INewSuperhero,
  ) {
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

    const newImagesParams = superheroData.images_b64?.map((image, i) => {
      return {
        superhero_id: superheroId,
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
  }

  async removeImagesFromSuperhero(
    superheroId: string,
    superheroData: IUpdatedSuperhero,
  ) {
    if (!superheroData.idsImageToDelete) return;
    if (typeof superheroData.idsImageToDelete === "string") {
      superheroData.idsImageToDelete = [superheroData.idsImageToDelete];
    }
    const removeImages = sql<IRemoveImagesQuery>`
      DELETE FROM images_superheroes
      WHERE
        superhero_id = $superhero_id AND id IN $$imgIds
    `;

    const removedImages = await removeImages.run(
      { superhero_id: superheroId, imgIds: superheroData.idsImageToDelete },
      pool,
    );
  }
}
export const imagesDb = new Images();
