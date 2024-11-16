import { SuperheroImage } from "../SuperheroImage/SuperheroImage";
import type { ISuperheroPreview } from "../../types/responses/superhero";
import listItemStyles from "./PageListItem.module.scss";
export function PagedListItem({ data }: { data: ISuperheroPreview }) {
  return (
    <li className={listItemStyles.superheroItem}>
      <SuperheroImage src={data.first_image} alt={data.nickname} />
      <h2>{data.nickname}</h2>
    </li>
  );
}

