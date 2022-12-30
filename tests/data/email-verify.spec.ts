import { EmailVerify } from "../../src/data/useCases/email-verify";
import { findByEmail } from "../../src/data/protocols/findByEmail";
import { Account } from "@/domain/models/account";

describe("EmailVerify", () => {
  const makeFindByEmailStub = (): findByEmail => {
    class FindByEmail implements findByEmail {
      async find(email: string): Promise<false | Account> {
        return { name: "Lucca", email, password: "12345678", id: "a1sd1asd4" };
      }
    }
    return new FindByEmail();
  };
  const makeSut = () => {
    const findByEmailStub = makeFindByEmailStub();
    return {
      findByEmailStub,
      emailVerify: new EmailVerify(findByEmailStub),
    };
  };
  test("should call findByEmail with correct value", async () => {
    const { emailVerify, findByEmailStub } = makeSut();
    const spy = jest.spyOn(findByEmailStub, "find");
    await emailVerify.verify("any@gmail.com");
    expect(spy).toBeCalledWith("any@gmail.com");
  });

  test("should throw if findByEmailThrows", async () => {
    const { emailVerify, findByEmailStub } = makeSut();
    jest.spyOn(findByEmailStub, "find").mockImplementationOnce(async () => {
      throw new Error();
    });
    expect(async () => {
      await emailVerify.verify("any@gmail.com");
    }).rejects.toThrow();
  });
  test("should return an account if findByEmail returns an account", async () => {
    const { emailVerify, findByEmailStub } = makeSut();
    var account = await emailVerify.verify("any@gmail.com");
    expect(account).toEqual({
      name: "Lucca",
      email: "any@gmail.com",
      password: "12345678",
      id: "a1sd1asd4",
    });

    jest.spyOn(findByEmailStub, "find").mockImplementationOnce(async () => {
      return false;
    });
    account = await emailVerify.verify("any@gmail.com");
    expect(account).toBe(false);
  });
});
