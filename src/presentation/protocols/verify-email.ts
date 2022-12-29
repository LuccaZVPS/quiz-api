import { Account } from "@/domain/models/account";

export interface VerfifyEmail {
  verify: (args: AuthenticationModel) => Promise<Account>;
}
