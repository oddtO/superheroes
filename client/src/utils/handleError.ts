import { isValidationError } from "../types/responses/errors";
import { AxiosError, type AxiosResponse } from "axios";
import type { SuperheroFormError } from "../types/responses/errors";
import { SuperheroValidFieldNames } from "../types/types";
import { UseFormSetError } from "react-hook-form";
import { SuperheroFormData } from "../schemas/SuperheroSchema";
export function handleError<ErrorType extends SuperheroFormError>(
  error: unknown,
  setError: UseFormSetError<SuperheroFormData>,
) {
  if (!(error instanceof AxiosError)) {
    throw new Error("Form submission failed");
  }
  const { data } = error.response as AxiosResponse<ErrorType>;
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
  alert("Server side validation triggered");
}
