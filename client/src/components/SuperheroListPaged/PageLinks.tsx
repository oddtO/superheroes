import { Link } from "react-router-dom";
import { usePageLinksCount } from "../../hooks/useSuperheroPreviews";
import styles from "./PageLinks.module.scss";
export function PageLinks({ currentPage }: { currentPage: number }) {
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
  for (let i = 1; i <= pageCount; ++i) {
    const isActivePage = i === currentPage;
    console.log("IS ACTIVE PAGE", isActivePage, i, currentPage);
    pageNumbersJSX.push(
      <li
        className={
          styles.pageLink + " " + (isActivePage ? styles.activePageLink : "")
        }
        key={i}
        aria-label={`Go to page ${i}`}
      >
        <Link to={`/pages/${i}`}>{i}</Link>
      </li>,
    );
  }
  return <ul className={styles.pageLinks}>{pageNumbersJSX}</ul>;
}
