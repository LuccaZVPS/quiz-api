import { AddAccountModel } from "@/domain/useCases/add-account";
import { Controller } from "../protocols/controller";
import { httpResponse } from "../protocols/http";
export class SignUpController implements Controller {
  async handle(httpRequest: any): Promise<httpResponse> {
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
    throw new Error();
  }
}
