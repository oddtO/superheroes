import { PagedList } from "../PagedList/PagedList";
import { useSuperheroPreviewsPaged } from "../../hooks/useSuperheroPreviews";
import { Button } from "../Button/Button";
import { useParams } from "react-router-dom";
import { PageLinks } from "./PageLinks";
export function SuperheroListPaged() {
  const { page: pageParam } = useParams();
  const currentPage = pageParam ?? 1;
  const {
    dataToLoad: superheroPreviews,
    isLoading,
    isError,
    errors,
  } = useSuperheroPreviewsPaged(+currentPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    throw errors;
  }

  return (
    <>
      <Button />
      <PagedList data={superheroPreviews} />
      <PageLinks />
    </>
  );
}
