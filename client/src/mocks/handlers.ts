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
  /* rest.post("/todos", async (req, res, ctx) => {
    const { title } = await req.json();

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
