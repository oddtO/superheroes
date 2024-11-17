import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import type { typeToFlattenedError } from "zod";
import { SuperheroFormData } from "../schemas/SuperheroSchema";
import { FieldErrorsImpl } from "react-hook-form";
import { Merge } from "react-hook-form";
/* export type SuperheroFormData = {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
}; */

export type IFieldErrors =
  typeToFlattenedError<SuperheroFormData>["fieldErrors"];
export type FormFieldPropsTemplate<T, U extends FieldValues> = {
  type: string;
  placeholder?: string;
  labelText: string;
  name: T;
  register: UseFormRegister<U>;
  error: FieldError | undefined;
};

export type SuperheroValidFieldNames = keyof SuperheroFormData;
