import { SuperheroForm } from "../SuperheroForm/SuperheroForm";

import { SuperheroSchema } from "../../schemas/SuperheroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SuperheroFormData } from "../../schemas/SuperheroSchema";
import { addSuperhero } from "../../lib/addSuperhero";
import { handleError } from "../../utils/handleError";
import { ImageListEditor } from "../ImageListEditor/ImageListEditor";
import { useNavigate } from "react-router-dom";
export function AddSuperheroForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    setValue,
  } = useForm<SuperheroFormData>({ resolver: zodResolver(SuperheroSchema) });

  const navigate = useNavigate();
  const onSubmit = async (data: SuperheroFormData) => {
    try {
      await addSuperhero(data);
      navigate(-1);
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
        heading="Add Superhero"
      />

      <ImageListEditor getValues={getValues} setValue={setValue} />
    </>
  );
}
