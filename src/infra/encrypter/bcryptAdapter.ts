import { Encrypter } from "@/data/protocols/encrypter";
import bcrypt from "bcryptjs";
export class BcryptAdapter implements Encrypter {
  encrypt(password: string): string {
    const hash = bcrypt.hashSync(password);
    return hash;
  }
}
