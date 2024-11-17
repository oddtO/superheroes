import { IFieldErrors } from "../types";
export type AddSuperheroError =
   {
      message: "Validation error";
      errors: IFieldErrors;
    }
  | {
      message: string;
    };


export function isValidationError(data: AddSuperheroError): data is Extract<AddSuperheroError, { message: "Validation error" }> {
  return data.message === "Validation error";
}
