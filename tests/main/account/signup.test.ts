import Request from "supertest";
import { MongoHelper } from "../../../src/infra/db/connection/connection";
import { app } from "../../../src/main/app";
describe("SignUp route", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  test("should return 400 if no body is provided ", async () => {
    await Request(app).post("/account").send({}).expect(400);
  });
  test("should return 201 if values are correct", async () => {
    await Request(app)
      .post("/account")
      .send({ email: "lucca@gmail.com", name: "lucca", password: "12345678" })
      .expect(201);
  });
});
