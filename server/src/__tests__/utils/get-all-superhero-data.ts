
import request from "supertest";
import app from "../../app";
// import { commonBeforeEach, commonAfterEach, commonAfterAll } from "../common";
import {
  superheroText,
  superheroTextIronMan,
  filesDirName,
  legalFiles,
  illegalFiles,
} from "../mocks/superhero";
import path from "path";
import { areFilesEqual } from "../utils/checkFileEquality";

export async function getAllSuperheroData(id: string, appParam: typeof app) {
  const response = await request(appParam).get(`/api/superhero/${id}`);

  return response.body;
}
