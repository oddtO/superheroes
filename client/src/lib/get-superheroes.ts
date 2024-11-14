import { $api } from "../api";
export function getSuperheroes() {
  return $api.get("/superheroes").then((res) => {
    return res.data;
  });
}
