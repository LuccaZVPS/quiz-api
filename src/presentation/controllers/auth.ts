import { badRequest, ok } from "../helpers/http-helpers";
import { Controller } from "../protocols/controller";
import { httpRequest, httpResponse } from "../protocols/http";

export class AuthController implements Controller {
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
    return ok();
  }
}
