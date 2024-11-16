
import request from "supertest";
import app from "../../app";

export async function getAllSuperheroData(id: string, appParam: typeof app) {
  const response = await request(appParam).get(`/api/superhero/${id}`);

  return response.body;
}
