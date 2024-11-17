import { $api } from "../api";

import type { SuperheroFormData } from "../types/types";
import type { ISuperheroDetails } from "../types/responses/superhero";
export function addSuperhero(data: SuperheroFormData) {
  return $api
    .post<ISuperheroDetails>("/superheroes", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
}
