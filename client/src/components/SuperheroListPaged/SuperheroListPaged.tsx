import { PagedList } from "../PagedList/PagedList";
import { useSuperheroPreviewsPaged } from "../../hooks/useSuperheroPreviews";
import { useParams } from "react-router-dom";
import { PageLinks } from "./PageLinks";
import { usePageLinksCount } from "../../hooks/useSuperheroPreviews";
import { NoDataFoundMessage } from "../NoDataFoundMessage/NoDataFoundMessage";
import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import { Loading } from "../Loading/Loading";
export function SuperheroListPaged() {
  const { page: pageParam } = useParams();

  const navigation = useNavigation();
  useEffect(() => {
    console.log(navigation.state);
  }, [navigation.state]);
  const currentPage = pageParam ?? 1;
  const {
    dataToLoad: superheroPreviews,
    isLoading: isPagedLoading,
    isError: isPagedError,
    errors: pagedErrors,
  } = useSuperheroPreviewsPaged(+currentPage);

  const {
    dataToLoad: pageCount,
    isLoading: isPageLinksCountLoading,
    isError: isPageLinksCountError,
    errors: pageLinksErrors,
  } = usePageLinksCount();

  if (isPageLinksCountLoading) return <div>Loading...</div>;
  if (isPageLinksCountError) {
    throw pageLinksErrors;
  }

  if (pageCount === 0) {
    return <NoDataFoundMessage />;
  }
  if (isPagedLoading) {
    return <Loading />;
  }
  if (isPagedError) {
    throw pagedErrors;
  }

  return (
    <>
      <PagedList data={superheroPreviews} />
      <PageLinks currentPage={+currentPage} pageCount={pageCount} />
    </>
  );
}
