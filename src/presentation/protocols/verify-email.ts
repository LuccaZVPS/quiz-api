import { Account } from "@/domain/models/account";

export interface findByEmail {
  verify: (email: string) => Promise<Account | false>;
}
