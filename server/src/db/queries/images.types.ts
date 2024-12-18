/** Types generated for queries found in "src/db/queries/images.ts" */
export type NumberOrString = number | string;

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

/** 'RemoveImages' parameters type */
export interface IRemoveImagesParams {
  imgIds: readonly (NumberOrString | null | void)[];
  superhero_id?: NumberOrString | null | void;
}

/** 'RemoveImages' return type */
export type IRemoveImagesResult = void;

/** 'RemoveImages' query type */
export interface IRemoveImagesQuery {
  params: IRemoveImagesParams;
  result: IRemoveImagesResult;
}

