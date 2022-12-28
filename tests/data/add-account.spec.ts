import { AddAccount } from "../../src/data/useCases/add-account";
import { Encrypter } from "../../src/data/protocols/encrypter";
import { AddAccountRepository } from "../../src/data/protocols/addAccountRepository";
import { Account } from "@/domain/models/account";

describe("Name of the group", () => {
  const MakeAddAccountRepositoryStub = () => {
    class AddAccountRepositoryStub implements AddAccountRepository {
      async add(account: Account): Promise<boolean> {
        return true;
      }
    }
    return new AddAccountRepositoryStub();
  };
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
    const addAccountRepositoryStub = MakeAddAccountRepositoryStub();
    const addAccount = new AddAccount(encrypterStub, addAccountRepositoryStub);

    return {
      encrypterStub,
      addAccount,
      addAccountRepositoryStub,
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

  test("should call AddAccountRepository with correct values", async () => {
    const { addAccount, addAccountRepositoryStub } = makeSut();
    const spy = jest.spyOn(addAccountRepositoryStub, "add");
    await addAccount.add({
      name: "any_name",
      email: "any@gmail.com",
      password: "12345678",
    });
    expect(spy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any@gmail.com",
      password: "valid_hash",
    });
  });
});
