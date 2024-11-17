import { SuperheroForm } from "../SuperheroForm/SuperheroForm";

import { SuperheroSchema } from "../../schemas/SuperheroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SuperheroValidFieldNames } from "../../types/types";
import { SuperheroFormData } from "../../types/types";
import { addSuperhero } from "../../lib/add-superhero";
import { AddSuperheroError } from "../../types/responses/errors";
import { AxiosError, AxiosResponse } from "axios";
import { isValidationError } from "../../types/responses/errors";

export function AddSuperheroForm() { const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SuperheroFormData>({ resolver: zodResolver(SuperheroSchema) });

  const onSubmit = async (data: SuperheroFormData) => {
    try {
      await addSuperhero(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data } = error.response as AxiosResponse<AddSuperheroError>;
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
        alert("Submitting form failed!");
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
