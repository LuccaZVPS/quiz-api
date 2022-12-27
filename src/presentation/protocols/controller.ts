import { httpRequest, httpResponse } from "./http";
export interface Controller {
  handle: (args: httpRequest) => Promise<httpResponse>;
}
