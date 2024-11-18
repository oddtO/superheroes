import type { UseFormHandleSubmit } from "../../types/types";
import type { SuperheroFormData } from "../../schemas/SuperheroSchema";
import type { FieldErrors } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";

export type SuperheroFormProps = {
  register: UseFormRegister<SuperheroFormData>;
  handleSubmit: UseFormHandleSubmit<SuperheroFormData, undefined>;
  errors: FieldErrors<SuperheroFormData>;
  onSubmit: (data: SuperheroFormData) => Promise<void>;
  heading: string;
};
