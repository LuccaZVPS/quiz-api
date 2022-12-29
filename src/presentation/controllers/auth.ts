import { badRequest, ok } from "../helpers/http-helpers";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/email-validator";
import { httpRequest, httpResponse } from "../protocols/http";

export class AuthController implements Controller {
  constructor(private emailValidator: EmailValidator) {}
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
    return ok();
  }
}
