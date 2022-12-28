import { OptionalId } from "mongodb";
import { AccountRepository } from "../../../../src/infra/db/repositories/account/account-repository";
import { MongoHelper } from "../../../../src/infra/db/connection/connection";
import { Account } from "@/domain/models/account";
describe("AddAccountRepository", () => {
  const sut = () => {
    return {
      accountRepository: new AccountRepository(),
    };
  };
  const collectionName = "accounts";
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  test("should return true if mongodb return an id", async () => {
    const { accountRepository } = sut();
    const account = {
      email: "any@gmail.com",
      name: "lucca",
      password: "hash",
    };
    const isSaved = await accountRepository.add(account);
    expect(isSaved).toBe(true);
  });

  test("should return false or throw if mongodb fails to save", async () => {
    const { accountRepository } = sut();
    const account = "";
    expect(async () => {
      await accountRepository.add(account as unknown as Account);
    }).rejects.toThrow();
  });
});
