import { Link } from "react-router-dom";
import { usePageLinksCount } from "../../hooks/useSuperheroPreviews";
export function PageLinks() {
  const {
    dataToLoad: pageCount,
    isLoading,
    isError,
    errors,
  } = usePageLinksCount();

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    throw errors;
  }
  const pageNumbersJSX = [];
  for (let i = 0; i < pageCount; ++i) {
    pageNumbersJSX.push(
      <li key={i} aria-label={`Go to page ${i}`}>
        <Link to={`/pages/${i + 1}`}>{i + 1}</Link>
      </li>,
    );
  }
  return <ul>{pageNumbersJSX}</ul>;
}
