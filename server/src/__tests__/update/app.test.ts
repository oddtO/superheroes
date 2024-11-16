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

/* jest.mock("../../db/pool");

beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll); */

async function getAllSuperheroData(id: string, appParam: typeof app) {
  const response = await request(appParam).get(`/api/superhero/${id}`);

  return response.body;
}
describe("Test updating requests", () => {
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

  describe("Change superhero text", () => {
    test("should update a superhero textual data", async () => {
      const currentSuperhero = await getAllSuperheroData("1", app);

      const response = await request(app)
        .patch("/api/superhero/1")
        .field("nickname", superheroText.nickname)
        .field("real_name", superheroText.real_name)
        .field("origin_description", "updated description")
        .field("catch_phrase", superheroText.catch_phrase)
        .field("superpowers", "updated superpowers")
        .set("Content-Type", "application/json");

      expect(response.body).toEqual({
        ...currentSuperhero,
        origin_description: expect.any(String),
        superpowers: expect.any(String),
      });
      expect(response.statusCode).toBe(200);

      const newSuperhero = response.body;
      expect(newSuperhero.nickname).toBe(superheroText.nickname);
      expect(newSuperhero.real_name).toBe(superheroText.real_name);
      expect(newSuperhero.origin_description).toBe("updated description");
      expect(newSuperhero.catch_phrase).toBe(superheroText.catch_phrase);
      expect(newSuperhero.superpowers).toBe("updated superpowers");

      const newSuperheroImgs = newSuperhero.image_ids;
      expect(newSuperheroImgs.length).toBe(5);

      expect(newSuperheroImgs[0]).toBe("1");
      expect(newSuperheroImgs[1]).toBe("2");
      expect(newSuperheroImgs[2]).toBe("3");
      expect(newSuperheroImgs[3]).toBe("4");
      expect(newSuperheroImgs[4]).toBe("5");

      const newSuperheroRegularRequest = await getAllSuperheroData("1", app);
      expect(newSuperheroRegularRequest.nickname).toBe(superheroText.nickname);
      expect(newSuperheroRegularRequest.real_name).toBe(
        superheroText.real_name,
      );
      expect(newSuperheroRegularRequest.origin_description).toBe(
        "updated description",
      );
      expect(newSuperheroRegularRequest.catch_phrase).toBe(
        superheroText.catch_phrase,
      );
      expect(newSuperheroRegularRequest.superpowers).toBe(
        "updated superpowers",
      );
    });

    test("should update a superhero textual data and remove images", async () => {
      const currentSuperhero = await getAllSuperheroData("1", app);

      const response = await request(app)
        .patch("/api/superhero/1")
        .field("nickname", "updated spiderman name")
        .field("real_name", "Parker's new Name")
        .field("origin_description", superheroText.origin_description)
        .field("catch_phrase", "With great power comes great testing")
        .field("superpowers", "updated superpowers")
        .field("idsImageToDelete", "2")
        .field("idsImageToDelete", "4")
        .set("Content-Type", "application/json");

      console.log(response.body);
      expect(response.statusCode).toBe(200);
      const newSuperhero = response.body;

      expect(newSuperhero.nickname).toBe("updated spiderman name");
      expect(newSuperhero.real_name).toBe("Parker's new Name");
      expect(newSuperhero.origin_description).toBe(
        superheroText.origin_description,
      );
      expect(newSuperhero.catch_phrase).toBe(
        "With great power comes great testing",
      );
      expect(newSuperhero.superpowers).toBe("updated superpowers");
      const newSuperheroImgs = newSuperhero.image_ids;
      expect(newSuperheroImgs.length).toBe(3);

      expect(newSuperheroImgs[0]).toBe("1");
      expect(newSuperheroImgs[1]).toBe("3");
      expect(newSuperheroImgs[2]).toBe("5");
    });

    test("should accept only valid ids", async () => {
      const currentSuperhero = await getAllSuperheroData("1", app);

      const response = await request(app)
        .patch("/api/superhero/1")
        .field("nickname", "updated spiderman name")
        .field("real_name", "Parker's new Name")
        .field("origin_description", superheroText.origin_description)
        .field("catch_phrase", "With great power comes great testing")
        .field("superpowers", "updated superpowers")
        .field("idsImageToDelete", 2)
        .field("idsImageToDelete", 4)
        .field("idsImageToDelete", "aasasd")
        .field("idsImageToDelete", "DAADSSAD")
        .set("Content-Type", "application/json");

      console.log(response.body);
      expect(response.statusCode).toBe(400);

      const expectedUnchangedSuperhero = await getAllSuperheroData("1", app);

      expect(expectedUnchangedSuperhero.nickname).toBe(
        currentSuperhero.nickname,
      );
      expect(expectedUnchangedSuperhero.real_name).toBe(
        currentSuperhero.real_name,
      );
      expect(expectedUnchangedSuperhero.origin_description).toBe(
        currentSuperhero.origin_description,
      );
      expect(expectedUnchangedSuperhero.catch_phrase).toBe(
        currentSuperhero.catch_phrase,
      );
      expect(expectedUnchangedSuperhero.superpowers).toBe(
        currentSuperhero.superpowers,
      );

      const expectedUnchangedSuperheroImgs =
        expectedUnchangedSuperhero.image_ids;

      expect(expectedUnchangedSuperheroImgs.length).toBe(5);

      expect(expectedUnchangedSuperheroImgs[0]).toBe("1");
      expect(expectedUnchangedSuperheroImgs[1]).toBe("2");
      expect(expectedUnchangedSuperheroImgs[2]).toBe("3");
      expect(expectedUnchangedSuperheroImgs[3]).toBe("4");
      expect(expectedUnchangedSuperheroImgs[4]).toBe("5");
    });
    test("should ignore absent image ids", async () => {
      const currentSuperhero = await getAllSuperheroData("1", app);

      const response = await request(app)
        .patch("/api/superhero/1")
        .field("nickname", "updated spiderman name")
        .field("real_name", "Parker's new Name")
        .field("origin_description", superheroText.origin_description)
        .field("catch_phrase", "With great power comes great testing")
        .field("superpowers", "updated superpowers")
        .field("idsImageToDelete", 1)
        .field("idsImageToDelete", 2)
        .field("idsImageToDelete", 12312132)
        .field("idsImageToDelete", 123123112)
        .set("Content-Type", "application/json");

      console.log(response.body);
      expect(response.statusCode).toBe(200);

      const expectedChangedSuperhero = await getAllSuperheroData("1", app);

      expect(expectedChangedSuperhero.nickname).toBe("updated spiderman name");
      expect(expectedChangedSuperhero.real_name).toBe("Parker's new Name");
      expect(expectedChangedSuperhero.origin_description).toBe(
        currentSuperhero.origin_description,
      );
      expect(expectedChangedSuperhero.catch_phrase).toBe(
        "With great power comes great testing",
      );
      expect(expectedChangedSuperhero.superpowers).toBe("updated superpowers");

      const expectedChangedSuperheroImgs = expectedChangedSuperhero.image_ids;

      expect(expectedChangedSuperheroImgs.length).toBe(3);

      expect(expectedChangedSuperheroImgs[0]).toBe("3");
      expect(expectedChangedSuperheroImgs[1]).toBe("4");
      expect(expectedChangedSuperheroImgs[2]).toBe("5");
    });
    test("should return 404 if superhero id not found", async () => {
      const currentSuperhero = await getAllSuperheroData("1", app);

      const response = await request(app)
        .patch("/api/superhero/121312312312")
        .field("nickname", "updated spiderman name")
        .field("real_name", "Parker's new Name")
        .field("origin_description", superheroText.origin_description)
        .field("catch_phrase", "With great power comes great testing")
        .field("superpowers", "updated superpowers")
        .field("idsImageToDelete", 1)
        .field("idsImageToDelete", 2)
        .field("idsImageToDelete", 12312132)
        .field("idsImageToDelete", 123123112)
        .set("Content-Type", "application/json");

      console.log(response.body);
      expect(response.statusCode).toBe(404);
    });

    test("should be able to add new images as well as delete the old ones", async () => {
      const currentSuperhero = await getAllSuperheroData("1", app);

      const response = await request(app)
        .patch("/api/superhero/1")
        .field("nickname", superheroText.nickname)
        .field("real_name", superheroText.real_name)
        .field("origin_description", superheroText.origin_description)
        .field("catch_phrase", superheroText.catch_phrase)
        .field("superpowers", superheroText.superpowers)
        .field("idsImageToDelete", 1)
        .field("idsImageToDelete", 2)
        .field("idsImageToDelete", 3)
        .attach("images", path.join(filesDirName, legalFiles.jpg[0]))
        .attach("images", path.join(filesDirName, legalFiles.png[0]))
        .set("Content-Type", "application/json");

      console.log(response.body);
      expect(response.statusCode).toBe(200);

      const newSuperhero = response.body;

      console.log(newSuperhero.image_ids);
      expect(newSuperhero.image_ids.length).toBe(4);
      const newSuperheroRequery = await getAllSuperheroData("1", app);

      expect(newSuperheroRequery.image_ids.length).toBe(4);
    });
    test("should change first image result if the smallest image id for superhero id deleted", async () => {
      const currentSuperheroesResponse = await request(app)
        .get("/api/superheroes")
        .set("Content-Type", "application/json");

      const currentSuperheroes = currentSuperheroesResponse.body;
      console.log("HEROES: ", currentSuperheroes);
      const initialFirstImageSpiderman = currentSuperheroes[0].image_id;
      const initialFirstImageIronman = currentSuperheroes[1].image_id;

      const response = await request(app)
        .patch("/api/superhero/1")
        .field("nickname", superheroText.nickname)
        .field("real_name", superheroText.real_name)
        .field("origin_description", superheroText.origin_description)
        .field("catch_phrase", superheroText.catch_phrase)
        .field("superpowers", superheroText.superpowers)
        .field("idsImageToDelete", 1)
        .attach("images", path.join(filesDirName, legalFiles.jpg[0]))
        .attach("images", path.join(filesDirName, legalFiles.png[0]))
        .set("Content-Type", "application/json");

      console.log(response.body);
      expect(response.statusCode).toBe(200);

      expect(initialFirstImageSpiderman).toBe("1");
      expect(initialFirstImageIronman).toBe("6");
      const response2 = await request(app)
        .patch("/api/superhero/2")
        .field("nickname", superheroTextIronMan.nickname)
        .field("real_name", superheroTextIronMan.real_name)
        .field("origin_description", superheroTextIronMan.origin_description)
        .field("catch_phrase", superheroTextIronMan.catch_phrase)
        .field("superpowers", superheroTextIronMan.superpowers)
        .field("idsImageToDelete", 6)
        .set("Content-Type", "application/json");

      console.log(response2.body);
      expect(response2.statusCode).toBe(200);

      const updatedSuperheroesResponse = await request(app)
        .get("/api/superheroes")
        .set("Content-Type", "application/json");

      const updatedSuperheroes = updatedSuperheroesResponse.body;
      console.log("HEROES: ", updatedSuperheroes);
      const newExpectedFirstImageSpiderman = updatedSuperheroes[0].image_id;
      const newExpectedFirstImageIronman = updatedSuperheroes[1].image_id;

      expect(newExpectedFirstImageIronman).not.toBe(initialFirstImageIronman);
      expect(newExpectedFirstImageSpiderman).not.toBe(
        initialFirstImageSpiderman,
      );

      expect(newExpectedFirstImageSpiderman).toBe("2");
      expect(newExpectedFirstImageIronman).toBe("7");
    });
  });
});
