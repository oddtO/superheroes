import { PagedListItem } from "./PagedListItem";
import type { ISuperheroPreviewResponse } from "../../types/responses/superhero";
import pageListStyles from "./PageList.module.scss";
export function PagedList({data}: {data: ISuperheroPreviewResponse}) {
  return (
    <ul className={pageListStyles.pageList}>
      {data.map((superhero) => (
	<PagedListItem key={superhero.id} data={superhero} />
      ))}
    </ul>
  );
}
