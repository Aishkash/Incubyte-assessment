import request from "supertest";
import app from "../../src/app";
import prisma from "../../src/config/prisma";
import bcrypt from "bcrypt";


describe("Auth Login", () => {
  let email = `user${Date.now()}@test.com`;
  let password = "password123";

  beforeAll(async () => {
    await prisma.user.create({
      data: {
        name: "Test User Login",
        email,
        password: await bcrypt.hash(password, 10)
      }
    });
  });

  it("login success and token return", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
