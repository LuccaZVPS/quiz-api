import { AddAccountModel } from "../../../src/domain/useCases/add-account";
export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<boolean>;
}
