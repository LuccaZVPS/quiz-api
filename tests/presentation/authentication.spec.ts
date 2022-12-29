import { AuthController } from "../../src/presentation/controllers/auth";
import { EmailValidator } from "../../src/presentation/protocols/email-validator";

describe("Authentication Controller", () => {
  const makeEmailValidatorStub = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
      validate(email: string): boolean {
        return true;
      }
    }
    return new EmailValidatorStub();
  };
  const makeSut = () => {
    const emailValidator = makeEmailValidatorStub();
    return {
      emailValidator,
      sut: new AuthController(emailValidator),
    };
  };
  test("should return bad request if no body is provided", async () => {
    const { sut } = makeSut();
    const fakeDate = {};
    expect((await sut.handle(fakeDate)).statusCode).toBe(400);
    expect((await sut.handle(fakeDate)).body).toEqual({
      error: "body not provided",
    });
  });
  test("should return bad request if no email is provided", async () => {
    const { sut } = makeSut();
    const fakeDate = {
      body: {
        password: "12345678",
      },
    };
    expect((await sut.handle(fakeDate)).statusCode).toBe(400);
    expect((await sut.handle(fakeDate)).body).toEqual({
      error: "email not provided",
    });
  });

  test("should return bad request if no password is provided", async () => {
    const { sut } = makeSut();
    const fakeDate = {
      body: {
        email: "any@gmail.com",
      },
    };
    expect((await sut.handle(fakeDate)).statusCode).toBe(400);
    expect((await sut.handle(fakeDate)).body).toEqual({
      error: "password not provided",
    });
  });
  test("should call EmailValidator with correct value", async () => {
    const { sut, emailValidator } = makeSut();
    const fakeData = {
      body: {
        email: "any",
        password: "12345678",
      },
    };
    const spy = jest.spyOn(emailValidator, "validate");
    await sut.handle(fakeData);
    expect(spy).toHaveBeenCalledWith(fakeData.body.email);
  });

  test("should return bad request if EmailValidator return false", async () => {
    const { sut, emailValidator } = makeSut();
    const fakeData = {
      body: {
        email: "invalid",
        password: "12345678",
      },
    };
    const spy = jest
      .spyOn(emailValidator, "validate")
      .mockImplementationOnce(() => {
        return false;
      });
    const response = await sut.handle(fakeData);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "invalid email" });
  });
  test("should return bad request if invalid password is provided", async () => {
    const { sut, emailValidator } = makeSut();
    const fakeData = {
      body: {
        email: "correct@gmail.com",
        password: "invalid",
      },
    };
    const response = await sut.handle(fakeData);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "invalid password" });
  });
});
