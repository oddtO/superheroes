/** Types generated for queries found in "src/db/queries/superheroes.ts" */
export type NumberOrString = number | string;

export type stringArray = (string)[];

/** 'GetSuperheroes' parameters type */
export type IGetSuperheroesParams = void;

/** 'GetSuperheroes' return type */
export interface IGetSuperheroesResult {
  catch_phrase: string;
  first_image: string;
  id: string;
  image_id: string;
  mime_type: string;
  nickname: string;
  origin_description: string;
  original_filename: string;
  real_name: string;
  superpowers: string;
}

/** 'GetSuperheroes' query type */
export interface IGetSuperheroesQuery {
  params: IGetSuperheroesParams;
  result: IGetSuperheroesResult;
}

/** 'GetSuperheroAllData' parameters type */
export interface IGetSuperheroAllDataParams {
  id?: NumberOrString | null | void;
}

/** 'GetSuperheroAllData' return type */
export interface IGetSuperheroAllDataResult {
  catch_phrase: string;
  id: string;
  image_filenames: stringArray | null;
  image_ids: stringArray | null;
  image_types: stringArray | null;
  images_b64: stringArray | null;
  nickname: string;
  origin_description: string;
  real_name: string;
  superpowers: string;
}

/** 'GetSuperheroAllData' query type */
export interface IGetSuperheroAllDataQuery {
  params: IGetSuperheroAllDataParams;
  result: IGetSuperheroAllDataResult;
}

/** 'AddSuperheroMainTable' parameters type */
export interface IAddSuperheroMainTableParams {
  catch_phrase?: string | null | void;
  nickname?: string | null | void;
  origin_description?: string | null | void;
  real_name?: string | null | void;
  superpowers?: string | null | void;
}

/** 'AddSuperheroMainTable' return type */
export interface IAddSuperheroMainTableResult {
  catch_phrase: string;
  id: string;
  nickname: string;
  origin_description: string;
  real_name: string;
  superpowers: string;
}

/** 'AddSuperheroMainTable' query type */
export interface IAddSuperheroMainTableQuery {
  params: IAddSuperheroMainTableParams;
  result: IAddSuperheroMainTableResult;
}

/** 'AddSuperheroImages' parameters type */
export interface IAddSuperheroImagesParams {
  images_superheroes: readonly ({
    superhero_id: NumberOrString | null | void,
    image_data: string | null | void,
    original_filename: string | null | void,
    mime_type: string | null | void
  })[];
}

/** 'AddSuperheroImages' return type */
export type IAddSuperheroImagesResult = void;

/** 'AddSuperheroImages' query type */
export interface IAddSuperheroImagesQuery {
  params: IAddSuperheroImagesParams;
  result: IAddSuperheroImagesResult;
}

