import { AddAccount } from "../../src/data/useCases/add-account";
import { Encrypter } from "../../src/data/protocols/encrypter";

describe("Name of the group", () => {
  const makeEncrypterStub = () => {
    class EncrypterStub implements Encrypter {
      encrypt(password: string): string {
        return "valid_hash";
      }
    }
    return new EncrypterStub();
  };
  const makeSut = () => {
    const encrypterStub = makeEncrypterStub();
    const addAccount = new AddAccount(encrypterStub);

    return {
      encrypterStub,
      addAccount,
    };
  };
  test("should call Encrypter with correct value", async () => {
    const { addAccount, encrypterStub } = makeSut();
    const spy = jest.spyOn(encrypterStub, "encrypt");
    await addAccount.add({
      email: "any_email",
      name: "lucca",
      password: "any_password",
    });
    expect(spy).toHaveBeenCalledWith("any_password");
  });
});
