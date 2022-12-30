import { Account } from "@/domain/models/account";
import { findByEmail } from "@/presentation/protocols/verify-email";
import { findByEmail as findUserWithEmail } from "../protocols/findByEmail";

export class EmailVerify implements findByEmail {
  constructor(private findByEmail: findUserWithEmail) {}
  async verify(email: string): Promise<false | Account> {
    const account = await this.findByEmail.find(email);
    return account;
  }
}
