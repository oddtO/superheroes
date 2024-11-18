import { deleteSuperhero } from "../../lib/deleteSuperhero";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
export function DeleteButton({ id }: { id: string }) {
  const navigate = useNavigate();
  return (
    <button
      className={styles.deleteBtn}
      onClick={async () => {
        const confirm = window.confirm(
          "Are you sure you want to delete this superhero?",
        );
        if (!confirm) return;
        await deleteSuperhero(id);
        navigate("/");
      }}
    >
      Delete
    </button>
  );
}
