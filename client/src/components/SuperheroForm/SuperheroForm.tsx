import FormField from "../FormField/FormField";
import { SuperheroFormProps } from "./types";
import styles from "./styles.module.scss";
export function SuperheroForm({
  register,
  handleSubmit,
  errors,
  onSubmit,
  heading,
}: SuperheroFormProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.superheroForm}>
      <h1>{heading}</h1>
      <FormField
        type="text"
        labelText="Nickname"
        placeholder="Batman..."
        name="nickname"
        register={register}
        error={errors.nickname}
      />

      <FormField
        type="text"
        labelText="Real Name"
        placeholder="Bruce Wayne..."
        name="real_name"
        register={register}
        error={errors.real_name}
      />

      <FormField
        type="text"
        labelText="Origin description"
        placeholder="From Gotham City..."
        name="origin_description"
        register={register}
        error={errors.origin_description}
      />

      <FormField
        type="text"
        labelText="Superpowers"
        placeholder="Super strength, reflexes, etc..."
        name="superpowers"
        register={register}
        error={errors.superpowers}
      />

      <FormField
        type="text"
        labelText="Catch Phrase"
        placeholder="I'm Batman..."
        name="catch_phrase"
        register={register}
        error={errors.catch_phrase}
      />
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
