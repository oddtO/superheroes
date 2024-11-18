import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
export function Heading() {
  return (
    <header className={styles.heading}>
      <nav>
        <ul>
          <li className={styles.homeLink}>
            <Link to="/">Home</Link>
          </li>
          <li aria-label="Add new hero" className={styles.addIcon}>
            <Link to="new">+</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
