import styles from "./styles.module.scss";
import anonymous from "../../assets/anonymous.webp";
export function SuperheroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.imgWrapper}>
      <img src={src ? src : anonymous} alt={alt} />
    </div>
  );
}
