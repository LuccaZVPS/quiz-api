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
    expect(await (await sut.handle(fakeData)).statusCode).toBe(400);
  });
});
