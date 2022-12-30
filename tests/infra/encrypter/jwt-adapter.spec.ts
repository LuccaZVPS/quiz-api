import { JWTAdapter } from "../../../src/infra/encrypter/jwtAdapter";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
describe("JWT Adapter", () => {
  const makeSut = () => {
    return {
      jwtAdapter: new JWTAdapter(),
    };
  };
  test("should call jwt with correct value", () => {
    const { jwtAdapter } = makeSut();
    const spy = jest.spyOn(jwt, "sign");
    jwtAdapter.create({
      email: "any@gmail.com",
      name: "any",
      id: "any_id",
    });
    expect(spy).toHaveBeenCalledWith(
      {
        email: "any@gmail.com",
        name: "any",
        id: "any_id",
      },
      process.env.SECRET
    );
  });
});
