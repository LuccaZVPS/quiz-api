import { EmailValidatorAdapter } from "../../../src/infra/validators/email-validator";
import validator from "validator";
describe("EmailValidatorAdapter", () => {
  const emailValidator = new EmailValidatorAdapter();
  test("should call isEmail method is with correct value", () => {
    const email = "any@gmail.com";
    const spy = jest.spyOn(validator, "isEmail");
    emailValidator.validate(email);
    expect(spy).toHaveBeenCalledWith(email);
  });
});
