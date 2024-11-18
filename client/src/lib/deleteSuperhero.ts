import { $api } from "../api";
import type { ISuperheroDetails } from "../types/responses/superhero";
export function deleteSuperhero(id: string) {
  return $api.delete<ISuperheroDetails>("/superhero/" + id).then((res) => {
    return res.data;
  });
}
