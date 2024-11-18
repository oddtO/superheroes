import { SuperheroImage } from "../SuperheroImage/SuperheroImage";
import styles from "./styles.module.scss";
import deleteSvg from "../../assets/delete-svgrepo-com.svg";
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
        <img src={deleteSvg} alt="Delete" />
      </button>
      <SuperheroImage src={src} alt={alt} />
    </div>
  );
}
