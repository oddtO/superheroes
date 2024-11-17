import { SuperheroForm } from "../SuperheroForm/SuperheroForm";

import { SuperheroSchema } from "../../schemas/SuperheroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SuperheroValidFieldNames } from "../../types/types";
import { SuperheroFormData } from "../../types/types";
import { updateSuperhero } from "../../lib/updateSuperhero";
import {
  UpdateSuperheroError,
} from "../../types/responses/errors";
import { AxiosError, AxiosResponse } from "axios";
import { isValidationError } from "../../types/responses/errors";
import { useSuperheroDetailed } from "../../hooks/useSuperheroDetailed";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
export function EditSuperheroForm() {
  const { id: superheroId } = useParams();

  if (superheroId === undefined) throw new Error("id is undefined");

  const isNumber = /^\d+$/.test(superheroId);

  if (!isNumber) throw new Error("provided id is not a number");

  const {
    dataToLoad: superhero,
    isLoading,
    isError,
  } = useSuperheroDetailed(superheroId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<SuperheroFormData>({
    resolver: zodResolver(SuperheroSchema),
  });

  useEffect(() => {
    if (!superhero) return;
    reset({ ...superhero });
  }, [reset, superhero]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const onSubmit = async (data: SuperheroFormData) => {
    try {
      await updateSuperhero(data, superheroId);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data } = error.response as AxiosResponse<UpdateSuperheroError>;
        if (isValidationError(data)) {
          const serverErrors = data.errors;

          // Define a mapping between server-side field names and their corresponding client-side names
          const fieldErrorMapping: Record<string, SuperheroValidFieldNames> = {
            nickname: "nickname",
            real_name: "real_name",
            origin_description: "origin_description",
            superpowers: "superpowers",
            catch_phrase: "catch_phrase",
          };

          // Find the first field with an error in the response data
          Object.values(fieldErrorMapping).forEach((field) => {
            const fieldWithError = serverErrors[field];
            if (fieldWithError === undefined) return;
            // If a field with an error is found, update the form error state using setError
            // Use the ValidFieldNames type to ensure the correct field names
            setError(fieldErrorMapping[field], {
              type: "min",
              message: serverErrors[field]![0],
            });
          });
        }
        alert("Form submission failed!");
      }
    }
  };
  return (
    <SuperheroForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
}
