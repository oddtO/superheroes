import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import type { typeToFlattenedError } from "zod";


export type SuperheroFormData = {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
};

export type IFieldErrors = typeToFlattenedError<SuperheroFormData>["fieldErrors"];
export type FormFieldPropsTemplate<T, U extends FieldValues> = {
  type: string;
  placeholder: string;
  labelText?: string;
  name: T;
  register: UseFormRegister<U>;
  error: FieldError | undefined;
};

export type SuperheroFormFieldProps = FormFieldPropsTemplate<
  SuperheroValidFieldNames,
  SuperheroFormData
>;


export type SuperheroValidFieldNames =
  | "nickname"
  | "real_name"
  | "origin_description"
  | "superpowers"
  | "catch_phrase";
