import { FieldError, UseFormRegister } from "react-hook-form";
import { ImageList } from "../ImageList/ImageList";
import { SuperheroFormData } from "../../schemas/SuperheroSchema";
import { useCallback, useMemo } from "react";
import type { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import {  useState } from "react";
import { getImgDataUrlsAndNames } from "../../utils/convertImageFilesToDataURL";
import { ImageSchema, ImageValidationError } from "../../schemas/ImageSchema";
import { ISuperheroDetails } from "../../types/responses/superhero";
export function ImageListEditor({
  getValues,
  setValue,
  superhero,
  serverSideRemove,
}: {
  getValues: UseFormGetValues<SuperheroFormData>;
  setValue: UseFormSetValue<SuperheroFormData>;
  register: UseFormRegister<SuperheroFormData>;
  superhero?: ISuperheroDetails;
  serverSideRemove?: (index: number) => void;
}) {
  const [imgDataUrls, setImgDataUrls] = useState<string[]>([]);
  const [imgNames, setImgNames] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<ImageValidationError | null>(
    null,
  );
  const serverSideImgsInit = useMemo(() => {
    if (superhero?.images_b64 && superhero?.images_b64[0] !== null) {
      return [...superhero.images_b64];
    }
    return [];
  }, [superhero]);

  const serverSideImgsNamesInit = useMemo(() => {
    if (superhero?.image_filenames && superhero?.image_filenames[0] !== null) {
      return [...superhero.image_filenames];
    }
    return [];
  }, [superhero]);

  const [serverSideImgDataUrls, setServerSideImgDataUrls] =
    useState<string[]>(serverSideImgsInit);
  const [serverSideImgNames, setServerSideImgNames] = useState<string[]>(
    serverSideImgsNamesInit,
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

  function removeServerSideImgWrapper(name: string) {
    let indexToRemove = -1;
    const filteredServerSideImgNames = serverSideImgNames.filter(
      (imgName, i) => {
        const isNameToRemoveFound = imgName === name;
        if (isNameToRemoveFound) {
          indexToRemove = i;
          setServerSideImgDataUrls([
            ...serverSideImgDataUrls.slice(0, i),
            ...serverSideImgDataUrls.slice(i + 1),
          ]);
        }
        return !isNameToRemoveFound;
      },
    );

    if (serverSideRemove) {
      serverSideRemove(indexToRemove);
    }
    setServerSideImgNames(filteredServerSideImgNames);
  }

  const printableImageError = imageErrors?.flatten().fieldErrors.file?.[0];
  console.log("B64: ", superhero?.images_b64);
  console.log("serverSideImgDataUrls: ", serverSideImgDataUrls.length);
  return (
    <>
      <input type="file" name="new_file" onChange={addOnChange} />
      <span>{printableImageError ? printableImageError : null}</span>
      {imgDataUrls.length > 0 ? (
        <ImageList
          srcArr={imgDataUrls}
          altArr={imgNames}
          removeImage={removeImage}
        />
      ) : null}
      {serverSideImgDataUrls.length > 0 ? (
        <ImageList
          srcArr={serverSideImgDataUrls}
          altArr={serverSideImgNames}
          removeImage={removeServerSideImgWrapper}
        />
      ) : null}
    </>
  );
}
