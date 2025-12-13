import request from "supertest";
import app from "../../src/app";
import prisma from "../../src/config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let userToken: string;
let adminToken: string;
let sweetId: string;

beforeAll(async () => {
  // Clear DB
  await prisma.user.deleteMany();
  await prisma.sweet.deleteMany();

  // Create USER
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "user@test.com",
      password: await bcrypt.hash("password123", 10),
      role: "USER"
    }
  });

  // Create ADMIN
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN"
    }
  });

  // Generate tokens
  userToken = jwt.sign({ userId: user.id, role: "USER" }, process.env.JWT_SECRET as string);
  adminToken = jwt.sign({ userId: admin.id, role: "ADMIN" }, process.env.JWT_SECRET as string);
});

describe("Sweet CRUD + Inventory", () => {

  it("should create a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Chocolate",
        category: "Candy",
        price: 10,
        quantity: 50
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Chocolate");
    sweetId = res.body.id;
  });

  it("should get all sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should search sweets by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=Chocolate")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body[0].name).toBe("Chocolate");
  });

  it("should update a sweet", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ price: 12 });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(12);
  });

  it("should purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(49); // 50 - 1
  });

  it("should restock a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 10 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(59); // 49 + 10
  });

  it("should delete a sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(204);
  });

});
