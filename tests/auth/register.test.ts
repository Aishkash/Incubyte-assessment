import request from "supertest";
import app from "../../src/app";

describe("Auth Register", () => {
  it("should return token on register", async () => {
    jest.setTimeout(20000);
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "User",
        email: `user${Date.now()}@test.com`, // 👈 UNIQUE every run
        password: "password123"
      });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });
});
