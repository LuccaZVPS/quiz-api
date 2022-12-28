import { AddAccountRepository } from "@/data/protocols/addAccountRepository";
import { AddAccountModel } from "@/domain/useCases/add-account";
import { MongoHelper } from "../../connection/connection";

export class AccountRepository implements AddAccountRepository {
  private collectionName: string;
  constructor() {
    this.collectionName = "accounts";
  }
  async add(account: AddAccountModel): Promise<boolean> {
    const collection = MongoHelper.getCollection(this.collectionName);
    const userSaved = await collection.insertOne(account);
    if (!userSaved.insertedId) {
      return false;
    }

    return true;
  }
}
