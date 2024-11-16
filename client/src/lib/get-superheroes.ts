import { $api } from "../api";
export function getSuperheroes() {
  return $api.get("/superheroes").then((res) => {
    return res.data;
  });
}

export function getSuperheroById(id: string) {
  return $api.get(`/superhero/${id}`).then((res) => {
    return res.data;
  });
}
