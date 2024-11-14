/** Types generated for queries found in "src/db/queries/superheroes.ts" */

/** 'GetSuperheroes' parameters type */
export type IGetSuperheroesParams = void;

/** 'GetSuperheroes' return type */
export interface IGetSuperheroesResult {
  catch_phrase: string;
  id: string;
  nickname: string;
  origin_description: string;
  real_name: string;
  superpowers: string;
}

/** 'GetSuperheroes' query type */
export interface IGetSuperheroesQuery {
  params: IGetSuperheroesParams;
  result: IGetSuperheroesResult;
}

