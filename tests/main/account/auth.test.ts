import Request from "supertest";
import { MongoHelper } from "../../../src/infra/db/connection/connection";
import { app } from "../../../src/main/app";
describe("SignUp route", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.insertOne({
      name: "lucca",
      email: "luccazvps@gmail.com",
      password: "12345678",
      id: "any_id",
    });
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  test("should return 400 if no body is provided ", async () => {
    await Request(app).post("/auth").send({}).expect(400);
  });
  test("should return 400 if no email is provided ", async () => {
    const response = await Request(app)
      .post("/auth")
      .send({ password: "12345678" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "email not provided" });
  });
  test("should return 400 if no password is provided ", async () => {
    const response = await Request(app)
      .post("/auth")
      .send({ email: "any@gmail.com" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "password not provided" });
  });
  test("should return 400 if no invalid email is provided ", async () => {
    const response = await Request(app)
      .post("/auth")
      .send({ email: "invalid", password: "12345678" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "invalid email" });
  });
  test("should return 404 if email dont exist ", async () => {
    const response = await Request(app)
      .post("/auth")
      .send({ email: "lucca@gmail.com", password: "12345678" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "email or password incorrect" });
  });
  test("should return 404 if password is incorrect ", async () => {
    const response = await Request(app)
      .post("/auth")
      .send({ email: "luccazvps@gmail.com", password: "lucca123" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "email or password incorrect" });
  });
  test("should return 200  ", async () => {
    const response = await Request(app)
      .post("/auth")
      .send({ email: "luccazvps@gmail.com", password: "12345678" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });
});
