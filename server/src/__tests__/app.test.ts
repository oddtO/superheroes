import request from "supertest";
import app from "../app";
import {
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  DATAURL_BUFFER_OFFSET,
} from "./common";
import { superheroText } from "./mocks/superhero";
import path from "path";
import { loadFile } from "./mocks/utils/loadFile";
import base64 from "base-64";
import { createDataUrl } from "../utils/createDataUrl";
import { areFilesEqual } from "./utils/checkFileEquality";

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
  "./mocks/assets/1svg_dummy_500x600_000000_b9f280.svg",
  "./mocks/assets/csv_notAnImage.csv",
  "./mocks/assets/noext_notAnImage",
  "./mocks/assets/txt_notAnImage.txt",
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
      .set("Content-Type", "application/json");

    expect(postResult.status).toBe(201);
    const getResults = await request(app)
      .get("/api/superheroes")
      .expect("Content-Type", /json/);

    const superheroes = getResults.body;
    expect(superheroes.length).toBe(1);
    expect(superheroes[0]).toMatchObject(superheroText);
    const superhero = superheroes[0];

    areFilesEqual(__dirname, superhero.first_image, legalFiles.webp[0]);
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
  test("should reject superhero object if illegal file is supplied", async () => {
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
      .attach("images", path.join(__dirname, legalFiles.png[2]))
      .attach("images", path.join(__dirname, illegalFiles[0]));

    expect(postResult.status).toBe(400);
    expect(postResult.body).toStrictEqual({
      message: "file type not allowed",
    });
  });

  test("should be able to get all images of a superhero", async () => {
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
      .set("Accept", "application/json");

    expect(postResult.status).toBe(201);
    const getResults = await request(app)
      .get("/api/superhero/1")
      .expect("Content-Type", /json/);

    const superhero = getResults.body;
    expect(superhero.images_b64.length).toBe(5);
    expect(superhero).toMatchObject(superheroText);

    expect(superhero.image_types[0]).toBe("image/webp");
    expect(superhero.image_types[1]).toBeOneOf(["image/jpeg", "image/jpg"]);
    expect(superhero.image_types[2]).toBe("image/png");
    expect(superhero.image_types[3]).toBe("image/png");
    expect(superhero.image_types[4]).toBe("image/png");

    areFilesEqual(__dirname, superhero.images_b64[0], legalFiles.webp[0]);
    areFilesEqual(__dirname, superhero.images_b64[1], legalFiles.jpg[0]);
    areFilesEqual(__dirname, superhero.images_b64[2], legalFiles.png[0]);
    areFilesEqual(__dirname, superhero.images_b64[3], legalFiles.png[1]);
    areFilesEqual(__dirname, superhero.images_b64[4], legalFiles.png[2]);
  });
});
