import { RemovableImage } from "../RemovableImage/RemovableImage";
import styles from "./styles.module.scss";

export function ImageList({
  srcArr,
  altArr,
  listTitle,
  removeImage,
}: {
  srcArr: string[];
  altArr: string[];
  listTitle: string;
  removeImage: (name: string) => void;
}) {
  return (
    <div className={styles.imageListWrapper}>
      <h2>{listTitle}</h2>
      <ul>
        {srcArr.map((src, i) => (
          <RemovableImage
            key={altArr[i]}
            src={src}
            alt={altArr[i]}
            removeImage={removeImage}
          />
        ))}
      </ul>
    </div>
  );
}
