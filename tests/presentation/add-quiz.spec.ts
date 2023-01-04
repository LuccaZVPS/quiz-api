import { AddQuizController } from "../../src/presentation/controllers/add-quiz";
import { validQuestions } from "./mocks/quiz";
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
  test("should return bad request if quiz name  is not provided", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({
      body: {
        categories: ["javascript", "react"],
        questions: validQuestions,
        correct: 1,
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "quiz name not provided" });
  });
  test("should return bad request if quiz categories  is not provided", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({
      body: {
        name: "fundamentos do React",
        questions: validQuestions,
        correct: 1,
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "quiz categories not provided" });
  });
  test("should return bad request if quiz categories  is not provided", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({
      body: {
        name: "fundamentos do React",
        categories: ["javascript", "react"],
        correct: 1,
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "quiz questions not provided" });
  });
  test("should return bad request if quiz categories  is not provided", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({
      body: {
        name: "fundamentos do React",
        categories: ["javascript", "react"],
        questions: validQuestions,
      },
    });
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "quiz correct not provided" });
  });
});
