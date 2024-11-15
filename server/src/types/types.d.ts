import type { IGetSuperheroAllDataResult } from "../db/queries/superheroes.types"
export type INewSuperhero = Omit<Omit<IGetSuperheroAllDataResult, "image_ids">, "id">


interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

