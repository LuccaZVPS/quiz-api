export interface CreateJWTModel {
  name: string;
  email: string;
  id: string;
}
export interface CreateJWT {
  create: (arg: CreateJWTModel) => Promise<string>;
}
