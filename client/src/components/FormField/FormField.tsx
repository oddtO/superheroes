import { SuperheroFormFieldProps } from "./types";

function FormField({
  type,
  labelText,
  placeholder = labelText,
  name,
  register,
  error,
}: SuperheroFormFieldProps) {
  return (
    <>
      <label htmlFor={name}>{labelText}: </label>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        {...register(name)}
      />
      {error && <span>{error.message}</span>}
    </>
  );
}
export default FormField;
