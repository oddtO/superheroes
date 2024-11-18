import { PagedListItem } from "./PagedListItem";
import type { ISuperheroPreviewResponse } from "../../types/responses/superhero";
import pageListStyles from "./PageList.module.scss";
import { useNavigation } from "react-router-dom";
export function PagedList({ data }: { data: ISuperheroPreviewResponse }) {
  const { state: navigationState } = useNavigation();

  return (
    <ul className={pageListStyles.pageList}>
      {data.map((superhero) => (
        <PagedListItem key={superhero.id} data={superhero} />
      ))}
    </ul>
  );
}
