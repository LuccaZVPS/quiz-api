import { Controller } from "../protocols/controller";
import { httpResponse } from "../protocols/http";
export class SignUpController implements Controller {
  async handle(httpRequest: any): Promise<httpResponse> {
    if (!httpRequest.body) {
      return { body: "Missing body", statusCode: 400 };
    }
    throw new Error();
  }
}
