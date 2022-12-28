import { EmailValidatorAdapter } from "../../../src/infra/validators/email-validator";
import validator from "validator";
describe("EmailValidatorAdapter", () => {
  const sut = () => {
    return {
      emailValidator: new EmailValidatorAdapter(),
    };
  };
  test("should call isEmail method is with correct value", () => {
    const { emailValidator } = sut();
    const email = "any@gmail.com";
    const spy = jest.spyOn(validator, "isEmail");
    emailValidator.validate(email);
    expect(spy).toHaveBeenCalledWith(email);
  });
  test("should return the shame value of isEmail", () => {
    const { emailValidator } = sut();

    const email = "any@gmail.com";
    var spy = jest.spyOn(validator, "isEmail").mockImplementationOnce(() => {
      return false;
    });
    var isEmail = emailValidator.validate(email);
    expect(isEmail).toBe(false);
    spy = jest.spyOn(validator, "isEmail").mockImplementationOnce(() => {
      return true;
    });

    isEmail = emailValidator.validate(email);
    expect(isEmail).toBe(true);
  });
  test("should throw error if isEmail throws error", () => {
    const { emailValidator } = sut();

    const email = "any@gmail.com";
    jest.spyOn(validator, "isEmail").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(() => {
      emailValidator.validate(email);
    }).toThrow();
  });
});
