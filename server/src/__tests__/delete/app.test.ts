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
import { getAllSuperheroData } from "../utils/get-all-superhero-data";

describe("Test app superhero deletion", () => {
  beforeEach(async () => {
    await request(app)
      .post("/api/superheroes")
      .field("nickname", superheroText.nickname)
      .field("real_name", superheroText.real_name)
      .field("origin_description", superheroText.origin_description)
      .field("catch_phrase", superheroText.catch_phrase)
      .field("superpowers", superheroText.superpowers)
      .attach("images", path.join(filesDirName, legalFiles.webp[0]))
      .attach("images", path.join(filesDirName, legalFiles.jpg[0]))
      .attach("images", path.join(filesDirName, legalFiles.png[0]))
      .attach("images", path.join(filesDirName, legalFiles.png[1]))
      .attach("images", path.join(filesDirName, legalFiles.png[2]))
      .set("Content-Type", "application/json");

    await request(app)
      .post("/api/superheroes")
      .field("nickname", superheroTextIronMan.nickname)
      .field("real_name", superheroTextIronMan.real_name)
      .field("origin_description", superheroTextIronMan.origin_description)
      .field("catch_phrase", superheroTextIronMan.catch_phrase)
      .field("superpowers", superheroTextIronMan.superpowers)
      .attach("images", path.join(filesDirName, legalFiles.webp[0]))
      .attach("images", path.join(filesDirName, legalFiles.jpg[0]))
      .attach("images", path.join(filesDirName, legalFiles.png[2]))
      .set("Content-Type", "application/json");
  });

  test("can delete a superhero", async () => {
    const initialSuperheroResponse = await getAllSuperheroData("1", app);

    const response = await request(app).delete(`/api/superhero/1`);

    expect(response.status).toBe(200);
    const nextSuperheroResponse = await getAllSuperheroData("1", app);

    expect(initialSuperheroResponse).not.toStrictEqual({
      message: "Not found",
    });
    expect(nextSuperheroResponse).toStrictEqual({ message: "Not found" });
  });
  test("returns 404 if superhero does not exist", async () => {
    const response = await request(app).delete(`/api/superhero/1123123123`);

    expect(response.status).toBe(404);
  });
});
