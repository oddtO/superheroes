import { IFieldErrors } from "../types";
type SuperheroFormError =
  | {
      message: "Validation error";
      errors: IFieldErrors;
    }
  | {
      message: string;
    };

export type AddSuperheroError = SuperheroFormError;

export type UpdateSuperheroError = SuperheroFormError;

export function isValidationError(
  data: SuperheroFormError,
): data is Extract<AddSuperheroError, { message: "Validation error" }> {
  return data.message === "Validation error";
}
