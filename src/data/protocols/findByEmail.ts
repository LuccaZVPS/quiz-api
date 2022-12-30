import { Account } from "@/domain/models/account";

export interface findByEmail {
  find: (email: string) => Promise<Account | false>;
}
