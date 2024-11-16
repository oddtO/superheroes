import type { IGetSuperheroAllDataResult } from "../db/queries/superheroes.types";
import type { UpdateSuperhero } from "../schemas/updateSuperheroSchema";
export type INewSuperhero = Omit<
  Omit<IGetSuperheroAllDataResult, "image_ids">,
  "id"
>;
export type IUpdatedSuperhero = INewSuperhero & UpdateSuperhero & {id: string};

interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
