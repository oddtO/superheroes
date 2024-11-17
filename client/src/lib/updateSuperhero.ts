import { $api } from "../api";

import type { SuperheroFormData } from "../types/types";
import type { ISuperheroDetails } from "../types/responses/superhero";
export function updateSuperhero(data: SuperheroFormData, id: string) {
  return $api
    .patch<ISuperheroDetails>("/superhero/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
}
