import { $api } from "../api";

import type { ISuperheroPreviewResponse } from "../types/responses/superhero";
import type { SuperheroFormData } from "../types/types";
export function addSuperhero(data: SuperheroFormData) {
  return $api
    .post<ISuperheroPreviewResponse>("/superheroes", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
}
