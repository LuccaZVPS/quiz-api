import { httpRequest, httpResponse } from "./http";
export interface Controller {
  handle: (httpRequest) => Promise<httpResponse>;
}
