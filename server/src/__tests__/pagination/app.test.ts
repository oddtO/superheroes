import request from "supertest";
import app from "../../app";
// import { commonBeforeEach, commonAfterEach, commonAfterAll } from "../common";
import {
  superheroText,
  filesDirName,
  legalFiles,
} from "../mocks/superhero";
import path from "path";

describe("pagination", () => {
  beforeEach(async () => {
    for (let i = 0; i < 30; i++) {
      await request(app)
        .post("/api/superheroes")
        .field("nickname", superheroText.nickname)
        .field("real_name", superheroText.real_name)
        .field("origin_description", superheroText.origin_description)
        .field("catch_phrase", superheroText.catch_phrase)
        .field("superpowers", superheroText.superpowers)
        .attach("images", path.join(filesDirName, legalFiles.webp[0]));
    }
  });
  test("endpoint should return 7 pages (assuming PAGE_SIZE is 5)", async () => {
    for (let i = 0; i < 5; i++) {
      await request(app)
        .post("/api/superheroes")
        .field("nickname", superheroText.nickname)
        .field("real_name", superheroText.real_name)
        .field("origin_description", superheroText.origin_description)
        .field("catch_phrase", superheroText.catch_phrase)
        .field("superpowers", superheroText.superpowers)
        .attach("images", path.join(filesDirName, legalFiles.webp[0]));
    }
    const response = await request(app).get("/api/paged");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ pages: 7 });
  });
  test("endpoint should return 6 pages (assuming PAGE_SIZE is 5)", async () => {
    const response = await request(app).get("/api/paged");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ pages: 6 });
  });
  test("should return 5 superheroes for each page", async () => {
    const response = await request(app).get("/api/paged/1");

    expect(response.status).toBe(200);
    const superheroesFirstPage = response.body;

    expect(superheroesFirstPage).toHaveLength(5);

    expect(superheroesFirstPage[0].id).toBe("1");
    expect(superheroesFirstPage[1].id).toBe("2");
    expect(superheroesFirstPage[2].id).toBe("3");
    expect(superheroesFirstPage[3].id).toBe("4");
    expect(superheroesFirstPage[4].id).toBe("5");


		const response2 = await request(app).get("/api/paged/5");

    expect(response2.status).toBe(200);
    const superheroesFifthPage = response2.body;

    expect(superheroesFifthPage).toHaveLength(5);

    expect(superheroesFifthPage[0].id).toBe("21");
    expect(superheroesFifthPage[1].id).toBe("22");
    expect(superheroesFifthPage[2].id).toBe("23");
    expect(superheroesFifthPage[3].id).toBe("24");
    expect(superheroesFifthPage[4].id).toBe("25");
  });
  test("Should return 500 when page does not exist", async () => {
    const response = await request(app).get("/api/paged/132214124213");

    expect(response.status).toBe(500);
    const superheroesFirstPage = response.body;

    expect(superheroesFirstPage).toStrictEqual({
      message: "Internal server error",
    });
  });
  test("should return validation error when page is not numeric", async () => {
    const response = await request(app).get("/api/paged/232not-numeric232");

    expect(response.status).toBe(400);
    const superheroesFirstPage = response.body;

    expect(superheroesFirstPage).toStrictEqual({
      message: "Validation error",
      errors: { page: ["Must be a numeric string"] },
    });
  });
});
