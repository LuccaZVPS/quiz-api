import { httpResponse } from "../protocols/http";

export const badRequest = (errorText: string): httpResponse => {
  return { body: { error: errorText }, statusCode: 400 };
};
export const ok = (text?: string): httpResponse => {
  return { body: text, statusCode: 200 };
};
export const conflict = (errorText: string): httpResponse => {
  return { body: { error: errorText }, statusCode: 409 };
};
export const notFound = (errorText?: string): httpResponse => {
  return { body: { error: errorText }, statusCode: 404 };
};
export const internalError = (errorText: string): httpResponse => {
  return { body: { error: errorText }, statusCode: 500 };
};
