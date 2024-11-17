import { $api } from "../api";

import type {
  UpdateSuperheroFormData,
} from "../schemas/SuperheroSchema";
import type { ISuperheroDetails } from "../types/responses/superhero";
import { converObjectToMultiPartFormData } from "../utils/convertObjectToMultiPartFormData";
export function updateSuperhero(data: UpdateSuperheroFormData, id: string) {
  const formData = converObjectToMultiPartFormData(data);
  return $api
    .patch<ISuperheroDetails>("/superhero/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
}
