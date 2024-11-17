import { SuperheroForm } from "../SuperheroForm/SuperheroForm";

import { SuperheroSchema } from "../../schemas/SuperheroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SuperheroFormData } from "../../types/types";
import { addSuperhero } from "../../lib/add-superhero";
import { handleError } from "../../utils/handleError";
export function AddSuperheroForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SuperheroFormData>({ resolver: zodResolver(SuperheroSchema) });

  const onSubmit = async (data: SuperheroFormData) => {
    try {
      await addSuperhero(data);
    } catch (error) {
      handleError(error, setError);
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
