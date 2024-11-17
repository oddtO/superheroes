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
import { areFilesEqual } from "../utils/check-file-equality";

// jest.mock("../../db/pool");
/* jest.mock("../../db/pool");
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll); */

describe("(Adding) superheroes app", () => {
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

      expect(results.status).toBe(400);
      expect(results.body).toMatchObject({
        message: "Validation error",
      });
      const errors = results.body.errors;
      expect(Object.keys(errors).length).toBe(4);
      expect(errors["catch_phrase"][0]).toMatch(/required/i);
      expect(errors["origin_description"][0]).toMatch(/required/i);
      expect(errors["real_name"][0]).toMatch(/required/i);
      expect(errors["superpowers"][0]).toMatch(/required/i);
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

    expect(results.status).toBe(400);
    expect(results.body).toMatchObject({
      message: "Validation error",
    });
    const errors = results.body.errors;
    expect(Object.keys(errors).length).toBe(3);
    expect(errors["nickname"][0]).toMatch(/required/i);
    expect(errors["catch_phrase"][0]).toMatch(/required/i);
    expect(errors["superpowers"][0]).toMatch(/required/i);
  });

  test("should add a valid superhero object", async () => {
    const postResult = await request(app)
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

    expect(postResult.status).toBe(201);
    const getResults = await request(app)
      .get("/api/superheroes")
      .expect("Content-Type", /json/);

    const superheroes = getResults.body;
    expect(superheroes.length).toBe(1);
    expect(superheroes[0]).toMatchObject(superheroText);
    const superhero = superheroes[0];

    areFilesEqual(filesDirName, superhero.first_image, legalFiles.webp[0]);
  });
  test("should add a valid superhero object (without images)", async () => {
    const postResult = await request(app)
      .post("/api/superheroes")
      .field("nickname", superheroText.nickname)
      .field("real_name", superheroText.real_name)
      .field("origin_description", superheroText.origin_description)
      .field("catch_phrase", superheroText.catch_phrase)
      .field("superpowers", superheroText.superpowers)

    expect(postResult.status).toBe(201);
    const getResults = await request(app)
      .get("/api/superheroes")
      .expect("Content-Type", /json/);

    const superheroes = getResults.body;
    expect(superheroes.length).toBe(1);
    expect(superheroes[0]).toMatchObject(superheroText);
  });
  test("should return error at lease one of fields is empty string", async () => {
    const postResult = await request(app)
      .post("/api/superheroes")
      .field("nickname", "")
      .field("real_name", superheroText.real_name)
      .field("origin_description", superheroText.origin_description)
      .field("catch_phrase", superheroText.catch_phrase)
      .field("superpowers", superheroText.superpowers)

    expect(postResult.status).toBe(400);
    const getResults = await request(app)
      .get("/api/superheroes")
      .expect("Content-Type", /json/);

    const superheroes = getResults.body;
    expect(superheroes.length).toBe(0);
  });
  test("should reject superhero object if illegal file is supplied", async () => {
    const postResult = await request(app)
      .post("/api/superheroes")
      .field("nickname", superheroText.nickname)
      .field("real_name", superheroText.real_name)
      .field("origin_description", superheroText.origin_description)
      .field("catch_phrase", superheroText.catch_phrase)
      .field("superpowers", superheroText.superpowers)
      .attach("images", path.join(filesDirName, legalFiles.webp[0]))
      .attach("images", path.join(filesDirName, legalFiles.jpg[0]))
      .attach("images", path.join(filesDirName, legalFiles.png[0]))
      .attach("images", path.join(filesDirName, legalFiles.png[2]))
      .attach("images", path.join(filesDirName, illegalFiles[0]));

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
      .attach("images", path.join(filesDirName, legalFiles.webp[0]))
      .attach("images", path.join(filesDirName, legalFiles.jpg[0]))
      .attach("images", path.join(filesDirName, legalFiles.png[0]))
      .attach("images", path.join(filesDirName, legalFiles.png[1]))
      .attach("images", path.join(filesDirName, legalFiles.png[2]))

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

    areFilesEqual(filesDirName, superhero.images_b64[0], legalFiles.webp[0]);
    areFilesEqual(filesDirName, superhero.images_b64[1], legalFiles.jpg[0]);
    areFilesEqual(filesDirName, superhero.images_b64[2], legalFiles.png[0]);
    areFilesEqual(filesDirName, superhero.images_b64[3], legalFiles.png[1]);
    areFilesEqual(filesDirName, superhero.images_b64[4], legalFiles.png[2]);

    expect(superhero.image_ids[0]).toBe("1");
    expect(superhero.image_ids[1]).toBe("2");
    expect(superhero.image_ids[2]).toBe("3");
    expect(superhero.image_ids[3]).toBe("4");
    expect(superhero.image_ids[4]).toBe("5");
  });

  test("multiple superheroes image id ordering", async () => {
    const postResult = await request(app)
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

    const postResultIronMan = await request(app)
      .post("/api/superheroes")
      .field("nickname", superheroTextIronMan.nickname)
      .field("real_name", superheroTextIronMan.real_name)
      .field("origin_description", superheroTextIronMan.origin_description)
      .field("catch_phrase", superheroTextIronMan.catch_phrase)
      .field("superpowers", superheroTextIronMan.superpowers)
      .attach("images", path.join(filesDirName, legalFiles.webp[0]))
      .attach("images", path.join(filesDirName, legalFiles.jpg[0]))
      .attach("images", path.join(filesDirName, legalFiles.png[0]))
      .attach("images", path.join(filesDirName, legalFiles.png[1]))
      .attach("images", path.join(filesDirName, legalFiles.png[2]))

    const spiderMan = await request(app).get("/api/superhero/1");

    const ironMan = await request(app).get("/api/superhero/2");

    expect(spiderMan.body.image_ids[0]).toBe("1");
    expect(spiderMan.body.image_ids[1]).toBe("2");
    expect(spiderMan.body.image_ids[2]).toBe("3");
    expect(spiderMan.body.image_ids[3]).toBe("4");
    expect(spiderMan.body.image_ids[4]).toBe("5");

    expect(ironMan.body.image_ids[0]).toBe("6");
    expect(ironMan.body.image_ids[1]).toBe("7");
    expect(ironMan.body.image_ids[2]).toBe("8");
    expect(ironMan.body.image_ids[3]).toBe("9");
    expect(ironMan.body.image_ids[4]).toBe("10")});
});
