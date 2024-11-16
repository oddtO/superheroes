import { $api } from "../api";

import type { ISuperheroPreviewResponse } from "../types/responses/superhero";
export function addSuperhero(data: FormData) {
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
