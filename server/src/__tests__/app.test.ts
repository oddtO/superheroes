import request from "supertest";
import app from "../app";
import { commonBeforeEach, commonAfterEach, commonAfterAll, DATAURL_BUFFER_OFFSET } from "./common";
import { superheroText } from "./mocks/superhero";
import path from "path";
import { loadFile } from "./mocks/utils/loadFile";
import base64 from "base-64";
import { createDataUrl } from "../utils/createDataUrl";



jest.mock("../db/pool");
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

const legalFiles = {
  png: [
    "./mocks/assets/1png_dummy_1000x1200_b9f280.png",
    "./mocks/assets/2png_dummy_600x400_000000_3ce8df.png",
    "./mocks/assets/3png_dummy_600x400_ffffff_cccccc.png",
  ],
  jpg: ["./mocks/assets/1jpg_dummy_800x600_000000_b9f280.jpg"],
  webp: ["./mocks/assets/1webp_dummy_1200x1200_000000_b9f280.webp"],
};

const illegalFiles = [
  "./assets/1svg_dummy_500x600_000000_b9f280.svg",
  "./assets/csv_notAnImage.csv",
  "./assets/noext_notAnImage",
  "./assets/txt_notAnImage.txt",
];
describe("Test application database", () => {
  test("should be empty", (done) => {
    request(app)
      .get("/api/superheroes")
      .expect("Content-Type", /json/)
      .expect([])
      .expect(200, done);
  });

  describe("Add superhero", () => {
    test("should require all fields for hero (case 1)", async () => {
      const results = await request(app)
        .post("/api/superheroes")
        .send({
          nickname: "Spiderman",
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(results.status).toBe(400);
      expect(results.body).toMatchObject({
        message: "Validation error",
      });
      const errors = results.body.errors;
      expect(Object.keys(errors).length).toBe(4);
      expect(errors["catch_phrase"][0]).toMatch(/required/);
      expect(errors["origin_description"][0]).toMatch(/required/);
      expect(errors["real_name"][0]).toMatch(/required/);
      expect(errors["superpowers"][0]).toMatch(/required/);
    });
  });
  test("should require all fields for hero (case 2)", async () => {
    const results = await request(app)
      .post("/api/superheroes")
      .send({
        origin_description:
          "In a quiet suburban neighborhood, Emily Grant was just another high school student, excelling in academics and sports, with dreams of becoming a scientist. One fateful evening, while attending a research internship at a nearby observatory, an experimental satellite designed to harness cosmic energy malfunctioned, sending a powerful burst of radiation toward Earth. Emily, caught in its path, was exposed to the strange energy. ",

        real_name: "Emily Grant",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(results.status).toBe(400);
    expect(results.body).toMatchObject({
      message: "Validation error",
    });
    const errors = results.body.errors;
    expect(Object.keys(errors).length).toBe(3);
    expect(errors["nickname"][0]).toMatch(/required/);
    expect(errors["catch_phrase"][0]).toMatch(/required/);
    expect(errors["superpowers"][0]).toMatch(/required/);
  });

  test("should add a valid superhero object", async () => {
		
    const postResult = await request(app)
      .post("/api/superheroes")
      .field("nickname", superheroText.nickname)
      .field("real_name", superheroText.real_name)
      .field("origin_description", superheroText.origin_description)
      .field("catch_phrase", superheroText.catch_phrase)
      .field("superpowers", superheroText.superpowers)
      .attach("images", path.join(__dirname, legalFiles.webp[0]))
      .attach("images", path.join(__dirname, legalFiles.jpg[0]))
      .attach("images", path.join(__dirname, legalFiles.png[0]))
      .attach("images", path.join(__dirname, legalFiles.png[1]))
      .attach("images", path.join(__dirname, legalFiles.png[2]))
      .set("Content-Type", "application/json")

    expect(postResult.status).toBe(201);
    const getResults = await request(app)
      .get("/api/superheroes")
      .expect("Content-Type", /json/);

    const superheroes = getResults.body;
    expect(superheroes.length).toBe(1);
    expect(superheroes[0]).toMatchObject(superheroText);
    const superhero = superheroes[0];

    const firstFile = loadFile(__dirname, legalFiles.webp[0]);
    expect(superhero.first_image.slice(DATAURL_BUFFER_OFFSET)).toBe(firstFile.toString("base64"));
  });
  test("should add a valid superhero object (without images)", async () => {
    const postResult = await request(app)
      .post("/api/superheroes")
      .field("nickname", superheroText.nickname)
      .field("real_name", superheroText.real_name)
      .field("origin_description", superheroText.origin_description)
      .field("catch_phrase", superheroText.catch_phrase)
      .field("superpowers", superheroText.superpowers)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(postResult.status).toBe(201);
    const getResults = await request(app)
      .get("/api/superheroes")
      .expect("Content-Type", /json/);

    const superheroes = getResults.body;
    expect(superheroes.length).toBe(1);
    expect(superheroes[0]).toMatchObject(superheroText);
  });
});
