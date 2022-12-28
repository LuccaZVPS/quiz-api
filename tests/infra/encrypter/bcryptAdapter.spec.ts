import bcrypt from "bcryptjs";
import { BcryptAdapter } from "../../../src/infra/encrypter/bcryptAdapter";
describe("BcryptAdapter", () => {
  const sut = () => {
    return {
      bcryptAdapter: new BcryptAdapter(),
    };
  };
  test("should call bcrypt with correct value", () => {
    const { bcryptAdapter } = sut();
    const spy = jest.spyOn(bcrypt, "hashSync");
    bcryptAdapter.encrypt("password");
    expect(spy).toHaveBeenCalledWith("password");
  });

  test("should return a hash", () => {
    const { bcryptAdapter } = sut();
    const spy = jest.spyOn(bcrypt, "hashSync").mockImplementationOnce(() => {
      return "hash";
    });
    const hash = bcryptAdapter.encrypt("password");
    expect(hash).toBe("hash");
  });
});
