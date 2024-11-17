import type { SuperheroFormData, UseFormHandleSubmit } from "../../types/types";
import type { FieldErrors } from "react-hook-form";

import type { UseFormRegister } from "react-hook-form";

export type SuperheroFormProps = {
  register: UseFormRegister<SuperheroFormData>;
  handleSubmit: UseFormHandleSubmit<SuperheroFormData, undefined>;
  errors: FieldErrors<SuperheroFormData>;
  onSubmit: (data: SuperheroFormData) => Promise<void>;
};
