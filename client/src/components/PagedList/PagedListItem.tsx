import { SuperheroImage } from "../SuperheroImage/SuperheroImage";
import type { ISuperheroPreview } from "../../types/responses/superhero";
import listItemStyles from "./PageListItem.module.scss";
import { Link } from "react-router-dom";
export function PagedListItem({ data }: { data: ISuperheroPreview }) {
  return (
    <li className={listItemStyles.superheroItem}>
      <SuperheroImage src={data.first_image} alt={data.nickname} />
      <h2>{data.nickname}</h2>
      <button className={listItemStyles.viewMoreBtn}>
        <Link to={`/edit/${data.id}`}>View more</Link>
      </button>
    </li>
  );
}
