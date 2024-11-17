import { SuperheroForm } from "../SuperheroForm/SuperheroForm";

import { SuperheroSchema } from "../../schemas/SuperheroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SuperheroFormData } from "../../types/types";
import { updateSuperhero } from "../../lib/updateSuperhero";
import { useSuperheroDetailed } from "../../hooks/useSuperheroDetailed";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { handleError } from "../../utils/handleError";
export function EditSuperheroForm() {
  const { id: superheroId } = useParams();

  if (superheroId === undefined) throw new Error("id is undefined");

  const isNumber = /^\d+$/.test(superheroId);

  if (!isNumber) throw new Error("provided id is not a number");

  const {
    dataToLoad: superhero,
    isLoading,
    isError,
  } = useSuperheroDetailed(superheroId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<SuperheroFormData>({
    resolver: zodResolver(SuperheroSchema),
  });

  useEffect(() => {
    if (!superhero) return;
    reset({ ...superhero });
  }, [reset, superhero]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const onSubmit = async (data: SuperheroFormData) => {
    try {
      await updateSuperhero(data, superheroId);
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
