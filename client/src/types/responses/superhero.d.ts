interface ISuperheroText {
  id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
}
export interface ISuperheroPreview extends ISuperheroText {
  first_image: string;
  mime_type: string;
  original_filename: string;
  image_id: string;
}

export type ISuperheroPreviewResponse = ISuperheroPreview[];


export interface ISuperheroDetails extends ISuperheroText {
  image_ids: string[];
  images_b64: string[];
  image_filenames: string[];
  image_types: string[];
}
