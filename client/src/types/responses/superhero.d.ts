export interface ISuperheroPreview {
  id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  first_image: string;
  mime_type: string;
  original_filename: string;
  image_id: string;
}

export type ISuperheroPreviewResponse = ISuperheroPreview[];
