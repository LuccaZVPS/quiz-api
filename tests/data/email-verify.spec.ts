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
});
