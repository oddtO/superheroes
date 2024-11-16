import styles from "./styles.module.scss";
export function SuperheroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.imgWrapper}>
      <img src={src} alt={alt} />
    </div>
  );
}
