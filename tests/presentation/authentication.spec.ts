import { Account } from "@/domain/models/account";
import { AuthController } from "../../src/presentation/controllers/auth";
import { EmailValidator } from "../../src/presentation/protocols/email-validator";
import { findByEmail } from "../../src/presentation/protocols/verify-email";
import {
  CreateJWT as createJWTInterface,
  CreateJWTModel,
} from "../../src/presentation/protocols/create-jwt";

describe("Authentication Controller", () => {
  const makeCreateJWT = (): createJWTInterface => {
    class CreateJWT implements createJWTInterface {
      create(arg: CreateJWTModel): string {
        return "valid_jwt";
      }
    }
    return new CreateJWT();
  };
  const makeFindByEmailStub = (): findByEmail => {
    class FindByEmail implements findByEmail {
      async verify(email: string): Promise<Account> {
        return {
          id: "any_id",
          email: "any@gmail.com",
          name: "any_name",
          password: "any_password",
        };
      }
    }
    return new FindByEmail();
  };
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
    const findByEmailStub = makeFindByEmailStub();
    const createJWTStub = makeCreateJWT();
    return {
      createJWTStub,
      findByEmailStub,
      emailValidator,
      sut: new AuthController(emailValidator, findByEmailStub, createJWTStub),
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
  test("should call findByEmail with correct value", async () => {
    const { sut, findByEmailStub } = makeSut();
    const fakeData = {
      body: {
        email: "correct@gmail.com",
        password: "12345678",
      },
    };
    const spy = jest.spyOn(findByEmailStub, "verify");
    await sut.handle(fakeData);
    expect(spy).toHaveBeenCalledWith(fakeData.body.email);
  });
  test("should return notFound if findByEmail return false", async () => {
    const { sut, findByEmailStub } = makeSut();
    const fakeData = {
      body: {
        email: "correct@gmail.com",
        password: "12345678",
      },
    };
    jest.spyOn(findByEmailStub, "verify").mockImplementationOnce(async () => {
      return false;
    });
    const response = await sut.handle(fakeData);
    expect(response.statusCode).toEqual(404);
  });
  test("should return 404 if password are differents", async () => {
    const { sut, findByEmailStub } = makeSut();
    const fakeData = {
      body: {
        email: "correct@gmail.com",
        password: "12345678",
      },
    };

    const response = await sut.handle(fakeData);
    expect(response.statusCode).toEqual(404);
  });

  test("should call createJWT with correct values", async () => {
    const { sut, createJWTStub } = makeSut();
    const fakeData = {
      body: {
        email: "any@gmail.com",
        password: "any_password",
      },
    };
    const spy = jest.spyOn(createJWTStub, "create");
    await sut.handle(fakeData);
    expect(spy).toHaveBeenCalledWith({
      id: "any_id",
      email: "any@gmail.com",
      name: "any_name",
    });
  });
  test("should retturn 500 status code if createJWT throws an error", async () => {
    const { sut, createJWTStub } = makeSut();
    const fakeData = {
      body: {
        email: "any@gmail.com",
        password: "any_password",
      },
    };
    jest.spyOn(createJWTStub, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle(fakeData);
    expect(response.statusCode).toBe(500);
  });
  test("should return a jwt and 200 status code", async () => {
    const { sut } = makeSut();
    const fakeData = {
      body: {
        email: "any@gmail.com",
        password: "any_password",
      },
    };

    const response = await sut.handle(fakeData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: "valid_jwt" });
  });
});
