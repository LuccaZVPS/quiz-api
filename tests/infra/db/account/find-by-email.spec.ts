import { AccountRepository } from "../../../../src/infra/db/repositories/account/account-repository";
import { MongoHelper } from "../../../../src/infra/db/connection/connection";

describe("FindByEmail", () => {
  const makeSut = () => {
    return {
      findByEmail: new AccountRepository(),
    };
  };
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
    const collection = MongoHelper.getCollection("accounts");
    await collection.insertOne({
      name: "lucca",
      email: "luccazvps@gmail.com",
      password: "as4a5da4sd5",
    });
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  test("should return an acccount if mongoDB returns an account", async () => {
    const { findByEmail } = makeSut();
    const account = await findByEmail.find("luccazvps@gmail.com");
    expect(account).toBeTruthy();
    if (!account) {
      return;
    }
    expect(account.name).toBe("lucca");
    expect(account.email).toBe("luccazvps@gmail.com");
    expect(account.password).toBe("as4a5da4sd5");
  });
});
