import { AuthController } from "../../src/presentation/controllers/auth";
describe("Authentication Controller", () => {
  const makeSut = () => {
    return {
      sut: new AuthController(),
    };
  };
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
});
