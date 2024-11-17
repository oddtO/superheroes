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
          <li>
            <Link to="new">Add New</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
