import { $api } from "../api";
import type { ISuperheroPreviewResponse } from "../types/responses/superhero";
import type { ISuperheroDetails } from "../types/responses/superhero";
import type { PagesResponse } from "../types/responses/pages";
export function getSuperheroes() {
  return $api.get<ISuperheroPreviewResponse>("/superheroes").then((res) => {
    return res.data;
  });
}

export function getPageCount() {
  return $api.get<PagesResponse>("/paged").then((res) => {
    return res.data.pages;
  });
}
export function getSuperheroesByPage(page: number) {
  return $api
    .get<ISuperheroPreviewResponse>(`/paged/${page}`)
    .then((res) => {
      return res.data;
    });
}

export function getSuperheroById(id: string) {
  return $api.get<ISuperheroDetails>(`/superhero/${id}`).then((res) => {
    return res.data;
  });
}
