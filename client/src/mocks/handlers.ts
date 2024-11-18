import { http, HttpResponse } from "msw";
import { mockedImages } from "./imagesDataUri";
export const handlers = [
  http.get("/api/superheroes", () => {
    return HttpResponse.json([
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman",
        id: 1,
      },
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman Two",
        id: 2,
      },
    ]);
  }),
  http.get("/api/superhero/1", () => {
    return HttpResponse.json({
      images_b64: [mockedImages.webp[0], mockedImages.png[0]],
      image_ids: ["1", "2"],
      image_filenames: ["batman1", "batman2"],
      real_name: "Bruce Wayne",
      origin_description: "Gotham City",
      superpowers: "Money",
      catch_phrase: "I'm Batman",
      nickname: "Batman",
      id: 1,
    });
  }),
  http.get("/api/paged", () => {
    return HttpResponse.json({
      pages: 3,
    });
  }),
  http.get("/api/paged/1", () => {
    return HttpResponse.json([
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman",
        id: 1,
      },
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman Two",
        id: 2,
      },
      {
        first_image: mockedImages.webp[0],

        nickname: "Batman Three",
        id: 3,
      },
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman Four",
        id: 4,
      },
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman 5",
        id: 5,
      },
    ]);
  }),
  http.get("/api/paged/2", () => {
    return HttpResponse.json([
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman 6",
        id: 6,
      },
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman 7",
        id: 7,
      },
      {
        first_image: mockedImages.webp[0],

        nickname: "Batman 8",
        id: 8,
      },
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman 9",
        id: 9,
      },
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman 10",
        id: 10,
      },
    ]);
  }),
  http.get("/api/paged/3", () => {
    return HttpResponse.json([
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman 11",
        id: 11,
      },
      {
        first_image: mockedImages.webp[0],
        nickname: "Batman 12",
        id: 12,
      },
    ]);
  }),
  /* rest.post("/todos", async (req, res, ctx) => {
    const { title } = await req.json();
real_name   | origin_description | superpowers |   catch_phrase
    return res(
      ctx.status(201),
      ctx.json({
        userId: 1,
        title: title,
        completed: false,
        id: 5,
      }),
    );
  }), */
  /* rest.put("/todos/:id", async (req, res, ctx) => {
    const { id, userId, title, completed } = await req.json();

    return res(
      ctx.status(200),
      ctx.json({
        userId,
        title,
        completed,
        id,
      }),
    );
  }), */
  /* rest.delete("/todos/:id", (req, res, ctx) => {
    const { id } = req.params;

    return res(
      ctx.status(200),
      ctx.json({
        id: Number(id),
      }),
    );
  }), */
];
