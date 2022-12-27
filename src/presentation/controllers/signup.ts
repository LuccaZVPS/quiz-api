import { Controller } from "../protocols/controller";
import { httpResponse } from "../protocols/http";
export class SignUpController implements Controller {
  async handle(httpRequest: any): Promise<httpResponse> {
    if (!httpRequest.body) {
      return { body: "Missing body", statusCode: 400 };
    }
    const fields = ["name", "email", "password"];
    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return { body: `Missing ${field}`, statusCode: 400 };
      }
    }
    throw new Error();
  }
}
