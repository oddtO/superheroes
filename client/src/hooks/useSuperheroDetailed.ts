import { useData } from "./loadData";
import { getSuperheroById } from "../lib/getSuperheroes";
import { useCallback } from "react";
export function useSuperheroDetailed(id: string) {
  const cb = useCallback(() => getSuperheroById(id), [id]);
  const loadingState = useData(cb);
  return loadingState;
}
