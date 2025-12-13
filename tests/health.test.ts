import request from "supertest";
import app from "../src/app";

describe("Health Check", () => {
  it("should respond", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(404);
  });
});
