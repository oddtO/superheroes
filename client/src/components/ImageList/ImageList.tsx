import { RemovableImage } from "../RemovableImage/RemovableImage";

export function ImageList({
  srcArr,
  altArr,
  removeImage,
}: {
  srcArr: string[];
  altArr: string[];
  removeImage: (name: string) => void;
}) {
  return (
    <ul>
      {srcArr.map((src, i) => (
        <RemovableImage key={altArr[i]} src={src} alt={altArr[i]} removeImage={removeImage}/>
      ))}
    </ul>
  );
}
