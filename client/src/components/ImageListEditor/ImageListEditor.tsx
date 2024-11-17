import { FieldError, UseFormRegister } from "react-hook-form";
import FormField from "../FormField/FormField";
import { ImageList } from "../ImageList/ImageList";
import { SuperheroFormData } from "../../schemas/SuperheroSchema";
import { useCallback } from "react";
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";
import { getImgDataUrlsAndNames } from "../../utils/convertImageFilesToDataURL";
import { ImageSchema, ImageValidationError } from "../../schemas/ImageSchema";
import { ZodError } from "zod";
export function ImageListEditor({
  register,
  error,
  getValues,
  setValue,
}: {
  getValues: UseFormGetValues<SuperheroFormData>;
  setValue: UseFormSetValue<SuperheroFormData>;
  register: UseFormRegister<SuperheroFormData>;
  error: FieldError | undefined;
}) {
  const [imgDataUrls, setImgDataUrls] = useState<string[]>([]);
  const [imgNames, setImgNames] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<ImageValidationError | null>(
    null,
  );
  const addImage = useCallback(
    async (newImg: File) => {
      const images = getValues("images");
      let newImgs;
      if (images === undefined) {
        newImgs = [newImg];
      } else {
        newImgs = [...images, newImg];
      }

      setValue("images", newImgs);

      const imgDataUrlsAndNames = await getImgDataUrlsAndNames(newImgs);
      setImgDataUrls(imgDataUrlsAndNames.imgDataUrls);
      setImgNames(imgDataUrlsAndNames.imgNames);
    },
    [getValues, setValue],
  );

  function addOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.files = null;
    e.target.value = "";
    const validationResult = ImageSchema.safeParse({ file });
    if (validationResult.success) {
      setImageErrors(null);
      addImage(file);
    } else {
      setImageErrors(validationResult.error);
    }
  }

  async function removeImage(name: string) {
    const images = getValues("images");
    console.log(images);
    if (images === undefined) return;
    const newImgs = images.filter((image) => image.name !== name);

    setValue("images", newImgs);
    const imgDataUrlsAndNames = await getImgDataUrlsAndNames(newImgs);
    setImgDataUrls(imgDataUrlsAndNames.imgDataUrls);
    setImgNames(imgDataUrlsAndNames.imgNames);
  }

  const printableImageError = imageErrors?.flatten().fieldErrors.file?.[0];
  return (
    <>
      <input type="file" name="new_file" onChange={addOnChange} />
      <span>{printableImageError ? printableImageError : null}</span>
      {imgDataUrls.length > 0 && (
        <ImageList
          srcArr={imgDataUrls}
          altArr={imgNames}
          removeImage={removeImage}
        />
      )}
    </>
  );
}
