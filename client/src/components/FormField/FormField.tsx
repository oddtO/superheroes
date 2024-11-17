import { SuperheroFormFieldProps } from "../../types/types";

function FormField({
  type,
  placeholder,
  labelText = placeholder,
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
      {error && <span className="error-message">{error.message}</span>}
    </>
  );
}
export default FormField;
