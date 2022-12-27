import { SignUpController } from "../../src/presentation/controllers/signup";
describe("Signup Controller", () => {
  const makeSut = () => {
    const sut = new SignUpController();
    return {
      sut,
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
});
