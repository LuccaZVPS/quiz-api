import {
  AddAccount as AddAccountInterface,
  AddAccountModel,
} from "../../../src/domain/useCases/add-account";
import { AddAccountRepository } from "../protocols/addAccountRepository";
import { Encrypter } from "../protocols/encrypter";
export class AddAccount implements AddAccountInterface {
  constructor(
    private encrypter: Encrypter,
    private addAccountRepository: AddAccountRepository
  ) {}
  async add(account: AddAccountModel): Promise<void> {
    account.password = this.encrypter.encrypt(account.password);
    const isSaved = this.addAccountRepository.add(account);
  }
}
