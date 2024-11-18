import { getSuperheroes } from "../lib/getSuperheroes";
import { useData } from "./loadData";
import { getSuperheroesByPage } from "../lib/getSuperheroes";
import { useCallback } from "react";
import { getPageCount } from "../lib/getSuperheroes";
export function useSuperheroPreviews() {
  const loadingState = useData(getSuperheroes);
  return loadingState;
}
export function useSuperheroPreviewsPaged(page: number) {
  const cb = useCallback(() => getSuperheroesByPage(page), [page]);
  const loadingState = useData(cb);
  return loadingState;
}

export function usePageLinksCount() {
  const loadingState = useData(getPageCount);
  return loadingState;
}
