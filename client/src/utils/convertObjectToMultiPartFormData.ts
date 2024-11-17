import { SuperheroFormData } from "../schemas/SuperheroSchema";
export function converObjectToMultiPartFormData(data: SuperheroFormData) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const currentKey = key as keyof SuperheroFormData;
    if (!data[currentKey]) return;
    if (data[currentKey] instanceof Array) {
      for (const item of data[currentKey]) {
        formData.append(currentKey, item);
      }
      return;
    }

    formData.append(currentKey, data[currentKey]);

  });

  return formData;
}
