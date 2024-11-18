import { Link } from "react-router-dom";
import styles from "./PageLinks.module.scss";
export function PageLinks({
  currentPage,
  pageCount,
}: {
  currentPage: number;
  pageCount: number;
}) {
  const pageNumbersJSX = [];
  for (let i = 1; i <= pageCount; ++i) {
    const isActivePage = i === currentPage;
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
