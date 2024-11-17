import { SuperheroFormData } from "../../schemas/SuperheroSchema";
import { SuperheroValidFieldNames } from "../../types/types";
import type { FormFieldPropsTemplate } from "../../types/types";

export type SuperheroFormFieldProps = FormFieldPropsTemplate<
  SuperheroValidFieldNames,
  SuperheroFormData
>;
