import { SignUpController } from "../../src/presentation/controllers/signup";
import { EmailValidator } from "../../src/presentation/protocols/email-validator";
import {
  AddAccount,
  AddAccountModel,
} from "../../src/domain/useCases/add-account";

describe("Signup Controller", () => {
  const makeEmailValidatorStub = () => {
    class EmailValidatorStub implements EmailValidator {
      validate(email: string): boolean {
        return true;
      }
    }
    return new EmailValidatorStub();
  };
  const makeAddAccountStub = (): AddAccount => {
    class AddAccountStub implements AddAccount {
      async add(account: AddAccountModel): Promise<void> {}
    }
    return new AddAccountStub();
  };
  const makeSut = () => {
    const EmailValidatorStub = makeEmailValidatorStub();
    const AddAccountStub = makeAddAccountStub();
    const sut = new SignUpController(EmailValidatorStub, AddAccountStub);
    return {
      sut,
      EmailValidatorStub,
      AddAccountStub,
    };
  };

  test("should return 400 status code if no body is provided", async () => {
    const { sut } = makeSut();
    const fakeData = {};
    expect((await sut.handle(fakeData)).statusCode).toBe(400);
  });
  test("should return 400 status code if no name is provided", async () => {
    const { sut } = makeSut();
    const fakeData = {
      body: {
        email: "any",
        password: "any",
      },
    };
    expect((await sut.handle(fakeData)).statusCode).toBe(400);
    expect((await sut.handle(fakeData)).body).toBe("Missing name");
  });
  test("should return 400 status code if no email is provided", async () => {
    const { sut } = makeSut();
    const fakeData = {
      body: {
        name: "any",
        password: "any",
      },
    };
    expect((await sut.handle(fakeData)).statusCode).toBe(400);
    expect((await sut.handle(fakeData)).body).toBe("Missing email");
  });
  test("should return 400 status code if no password is provided", async () => {
    const { sut } = makeSut();
    const fakeData = {
      body: {
        email: "any",
        name: "any",
      },
    };
    expect((await sut.handle(fakeData)).statusCode).toBe(400);
    expect((await sut.handle(fakeData)).body).toBe("Missing password");
  });
  test("should return 400 if name is invalid", async () => {
    const { sut } = makeSut();
    const fakeData = {
      body: {
        name: "a",
        password: "valid_password",
        email: "valid@gmail.com",
      },
    };
    expect((await sut.handle(fakeData)).statusCode).toBe(400);
    expect((await sut.handle(fakeData)).body).toBe("Invalid name");
  });
  test("should return 400 if password is invalid", async () => {
    const { sut } = makeSut();
    const fakeData = {
      body: {
        name: "valid",
        email: "valid@gmail.com",
        password: "invalid",
      },
    };
    expect((await sut.handle(fakeData)).statusCode).toBe(400);
    expect((await sut.handle(fakeData)).body).toBe("Invalid password");
  });
  test("should call email validator with correct values", async () => {
    const { sut, EmailValidatorStub } = makeSut();
    const fakeData = {
      body: {
        name: "valid",
        email: "valid@gmail.com",
        password: "12345678",
      },
    };
    const spy = jest.spyOn(EmailValidatorStub, "validate");
    await sut.handle(fakeData);
    expect(spy).toHaveBeenCalledWith(fakeData.body.email);
  });
  test("should return status code 500 if emailValidator throws an error", async () => {
    const { sut, EmailValidatorStub } = makeSut();
    const fakeData = {
      body: {
        name: "valid",
        email: "valid@gmail.com",
        password: "12345678",
      },
    };
    const spy = jest
      .spyOn(EmailValidatorStub, "validate")
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const response = await sut.handle(fakeData);
    expect(response.statusCode).toBe(500);
  });

  test("should call AddAccount with correct values", async () => {
    const { sut, AddAccountStub } = makeSut();
    const fakeData = {
      body: {
        name: "valid",
        email: "valid@gmail.com",
        password: "12345678",
      },
    };
    const spy = jest.spyOn(AddAccountStub, "add");
    await sut.handle(fakeData);
    expect(spy).toHaveBeenCalledWith(fakeData.body);
  });
  test("should return status code 500 if addAccount throws an error", async () => {
    const { sut, AddAccountStub } = makeSut();
    const fakeData = {
      body: {
        name: "valid",
        email: "valid@gmail.com",
        password: "12345678",
      },
    };
    const spy = jest.spyOn(AddAccountStub, "add").mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(fakeData);
    expect(response.statusCode).toBe(500);
  });
  test("Should return 201 if all values are correct", async () => {
    const { sut } = makeSut();
    const fakeDate = {
      body: {
        email: "valid_email",
        name: "valid_name",
        password: "12345678",
      },
    };
    const response = await sut.handle(fakeDate);
    expect(response.statusCode).toBe(201);
  });
});
