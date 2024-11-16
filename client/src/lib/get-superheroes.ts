import { $api } from "../api";
import type { ISuperheroPreviewResponse } from "../types/responses/superhero";
export function getSuperheroes() {
  return $api.get<ISuperheroPreviewResponse>("/superheroes").then((res) => {
    return res.data;
  });
}

export function getSuperheroById(id: string) {
  return $api.get(`/superhero/${id}`).then((res) => {
    return res.data;
  });
}
