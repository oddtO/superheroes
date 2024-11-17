import { getSuperheroes } from "../lib/get-superheroes";
import { useData } from "./loadData";

export function useSuperheroPreviews() {
  const loadingState = useData(getSuperheroes);
  return loadingState;
}
