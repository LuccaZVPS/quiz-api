import { AddAccount, AddAccountModel } from "@/domain/useCases/add-account";
import { Controller } from "../protocols/controller";
import { EmailValidator } from "../protocols/email-validator";
import { httpResponse } from "../protocols/http";
export class SignUpController implements Controller {
  constructor(
    private emailValidator: EmailValidator,
    private addAccount: AddAccount
  ) {}
  async handle(httpRequest: any): Promise<httpResponse> {
    try {
      if (!httpRequest.body) {
        return { body: "Missing body", statusCode: 400 };
      }
      const fields = ["name", "email", "password"];
      for (var field of fields) {
        if (!httpRequest.body[field]) {
          return { body: `Missing ${field}`, statusCode: 400 };
        }
      }
      const { name, email, password } = httpRequest.body as AddAccountModel;
      if (name.length < 3 || name.length > 16) {
        return { body: `Invalid name`, statusCode: 400 };
      }
      if (password.length < 8 || password.length > 22) {
        return { body: `Invalid password`, statusCode: 400 };
      }
      if (!this.emailValidator.validate(email)) {
        return { body: `Invalid email`, statusCode: 400 };
      }
      await this.addAccount.add({ email, name, password });
      return { body: `Account created`, statusCode: 201 };
    } catch {
      return { body: `unknown error`, statusCode: 500 };
    }
  }
}
