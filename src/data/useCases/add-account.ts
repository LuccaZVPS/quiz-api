import {
  AddAccount as AddAccountInterface,
  AddAccountModel,
} from "../../../src/domain/useCases/add-account";
import { Encrypter } from "../protocols/encrypter";
export class AddAccount implements AddAccountInterface {
  constructor(private encrypter: Encrypter) {}
  async add(account: AddAccountModel): Promise<void> {
    const hashedPassword = this.encrypter.encrypt(account.password);
  }
}
