import { AddQuizController } from "../../src/presentation/controllers/add-quiz";
describe("AddQuizController", () => {
  const makeSut = () => {
    return {
      sut: new AddQuizController(),
    };
  };
  test("should return bad request if body is not provided", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "body not provided" });
  });
});
