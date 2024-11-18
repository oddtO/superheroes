import styles from "./styles.module.scss";
export function NoDataFoundMessage() {
  return (
    <div className={styles.noDataFoundMessage}>
      <p>No data was found</p>
      <p className={styles.callToAction}>Upload the first superhero</p>
    </div>
  );
}
