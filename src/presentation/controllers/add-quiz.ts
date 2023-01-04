import { badRequest, ok } from "../helpers/http-helpers";
import { Controller } from "../protocols/controller";
import { httpRequest, httpResponse } from "../protocols/http";

export class AddQuizController implements Controller {
  async handle(args: httpRequest): Promise<httpResponse> {
    if (!args.body) {
      return badRequest("body not provided");
    }
    return ok();
  }
}
