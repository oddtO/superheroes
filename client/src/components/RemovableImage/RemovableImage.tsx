import { SuperheroImage } from "../SuperheroImage/SuperheroImage";
import styles from "./styles.module.scss";
export function RemovableImage({
  src,
  alt,
  removeImage,
}: {
  src: string;
  alt: string;
  removeImage: (name: string) => void;
}) {
  const name = alt;
  return (
    <div className={styles.imageContainer}>
      <button aria-label="Remove image" onClick={() => removeImage(name)}>
        X
      </button>
      <SuperheroImage src={src} alt={alt} />
    </div>
  );
}
