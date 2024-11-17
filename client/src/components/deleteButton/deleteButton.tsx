import { deleteSuperhero } from "../../lib/delete-superhero";
import { useNavigate } from "react-router-dom";
export function DeleteButton({ id }: { id: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={async () => {
        await deleteSuperhero(id);
        navigate(-1);
      }}
    >
      Delete
    </button>
  );
}
