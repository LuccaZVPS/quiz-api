import { badRequest, notFound, ok } from "../helpers/http-helpers";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/email-validator";
import { httpRequest, httpResponse } from "../protocols/http";
import { findByEmail as FindByEmail } from "../protocols/verify-email";

export class AuthController implements Controller {
  constructor(
    private emailValidator: EmailValidator,
    private findByEmail: FindByEmail
  ) {}
  async handle(response: httpRequest): Promise<httpResponse> {
    if (!response.body) {
      return badRequest(`body not provided`);
    }
    const fields = ["email", "password"];
    for (var field of fields) {
      if (!response.body[field]) {
        return badRequest(`${field} not provided`);
      }
    }
    const { email, password } = response.body;
    const isEmail = this.emailValidator.validate(email);
    if (!isEmail) {
      return badRequest("invalid email");
    }
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 22
    ) {
      return badRequest("invalid password");
    }
    const emailExist = await this.findByEmail.verify(email);
    if (!emailExist) {
      return notFound("email or password incorrect");
    }
    if (emailExist.password !== password) {
      return notFound("email or password incorrect");
    }
    return ok();
  }
}
