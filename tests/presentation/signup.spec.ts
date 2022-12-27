import { SignUpController } from "../../src/presentation/controllers/signup";
import { EmailValidator } from "../../src/presentation/protocols/email-validator";
describe("Signup Controller", () => {
  const makeEmailValidatorStub = () => {
    class EmailValidatorStub implements EmailValidator {
      validate(email: string): boolean {
        return true;
      }
    }
    return new EmailValidatorStub();
  };

  const makeSut = () => {
    const EmailValidatorStub = makeEmailValidatorStub();
    const sut = new SignUpController(EmailValidatorStub);
    return {
      sut,
      EmailValidatorStub,
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
});
