import { PagedList } from "../PagedList/PagedList";
import { useSuperheroPreviews } from "../../hooks/useSuperheroPreviews";
import { Button } from "../Button/Button";
export function SuperheroList() {
  const { superheroPreviews, isLoading, isError, errors } =
    useSuperheroPreviews();

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.log(errors);
    return <div>Error</div>;
  }

  return (
    <>
      <Button />
      <PagedList data={superheroPreviews} />
    </>
  );
}
