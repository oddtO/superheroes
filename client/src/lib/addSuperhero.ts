import { $api } from "../api";
import { converObjectToMultiPartFormData } from "../utils/convertObjectToMultiPartFormData";
import type { SuperheroFormData } from "../schemas/SuperheroSchema";
import type { ISuperheroDetails } from "../types/responses/superhero";
export function addSuperhero(data: SuperheroFormData) {
  const formData = converObjectToMultiPartFormData(data);

  return $api
    .post<ISuperheroDetails>("/superheroes", formData, {})
    .then((res) => {
      return res.data;
    });
}
