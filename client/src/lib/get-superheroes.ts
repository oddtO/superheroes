import { $api } from "../api";
import type { ISuperheroPreviewResponse } from "../types/responses/superhero";
import type { ISuperheroDetails } from "../types/responses/superhero";
export function getSuperheroes() {
  return $api.get<ISuperheroPreviewResponse>("/superheroes").then((res) => {
    return res.data;
  });
}

export function getSuperheroById(id: string) {
  return $api.get<ISuperheroDetails>(`/superhero/${id}`).then((res) => {
    console.log("res.data, ", res.data);
    return res.data;
  });
}
