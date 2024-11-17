export async function getImgDataUrlsAndNames(images: File[]) {
  const imgDataUrls = await Promise.all(
    images.map(async (image) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(image);
      });
    }),
  );
  const imgNames = images.map((image) => image.name);
  return { imgDataUrls, imgNames };
}
