import { SuperheroForm } from "../SuperheroForm/SuperheroForm";

import { SuperheroSchema } from "../../schemas/SuperheroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SuperheroFormData } from "../../schemas/SuperheroSchema";
import { addSuperhero } from "../../lib/add-superhero";
import { handleError } from "../../utils/handleError";
import { ImageListEditor } from "../ImageListEditor/ImageListEditor";
export function AddSuperheroForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    setValue,
  } = useForm<SuperheroFormData>({ resolver: zodResolver(SuperheroSchema) });

  const onSubmit = async (data: SuperheroFormData) => {
    try {
      console.log("DATA: ", data);
      await addSuperhero(data);
    } catch (error) {
      handleError(error, setError);
    }
  };
  return (
    <>
      <SuperheroForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />

      <ImageListEditor
        register={register}
        getValues={getValues}
        setValue={setValue}
        //@ts-expect-error: ignore file typing
        error={errors.images}
      />
    </>
  );
}