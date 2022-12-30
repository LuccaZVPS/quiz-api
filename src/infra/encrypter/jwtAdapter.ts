import { CreateJWT, CreateJWTModel } from "@/presentation/protocols/create-jwt";
import jwt from "jsonwebtoken";
export class JWTAdapter implements CreateJWT {
  create(arg: CreateJWTModel): string {
    const token = jwt.sign(arg, process.env.SECRET);
    return "";
  }
}
