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
});
