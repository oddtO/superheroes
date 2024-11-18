import { SuperheroFormFieldProps } from "./types";
import styles from "./styles.module.scss";
function FormField({
  type,
  labelText,
  placeholder = labelText,
  name,
  register,
  error,
}: SuperheroFormFieldProps) {
  return (
    <div className={styles.formField}>
      <label htmlFor={name}>{labelText}: </label>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name)}
      />
      {error && (
        <span className={styles.errorText}>{" * " + error.message}</span>
      )}
    </div>
  );
}
export default FormField;
