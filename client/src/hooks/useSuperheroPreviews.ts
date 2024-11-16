import { useState, useEffect } from "react";
import { getSuperheroes } from "../lib/get-superheroes";
import { AxiosError } from "axios";
import type { ISuperheroPreviewResponse } from "../types/responses/superhero";

type ReturnType =
  | {
      superheroPreviews: null;
      isLoading: true;
      isError: false;
      errors: unknown;
    }
  | {
      superheroPreviews: ISuperheroPreviewResponse;
      isLoading: false;
      isError: false;
      errors: null;
    }
  | {
      superheroPreviews: null;
      isLoading: false;
      isError: true;
      errors: unknown;
    };

export function useSuperheroPreviews(): ReturnType {
  const [superheroPreviews, setSuperheroPreviews] = useState<
    ISuperheroPreviewResponse[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    async function fetchSuperheroes() {
      try {
        const superheroes = await getSuperheroes();

        setSuperheroPreviews(superheroes);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);

        setIsLoading(false);

        if (error instanceof AxiosError) {
          setErrors(error.response?.data.errors);
        }
      }
    }

    fetchSuperheroes();
  }, []);

  return { superheroPreviews, isLoading, isError, errors };
}
