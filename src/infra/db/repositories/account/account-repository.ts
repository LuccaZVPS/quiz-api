import { AddAccountRepository } from "@/data/protocols/addAccountRepository";
import { findByEmail } from "@/data/protocols/findByEmail";
import { Account } from "@/domain/models/account";
import { AddAccountModel } from "@/domain/useCases/add-account";
import { MongoHelper } from "../../connection/connection";

export class AccountRepository implements AddAccountRepository, findByEmail {
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
  async find(email: string): Promise<false | Account> {
    const collection = MongoHelper.getCollection(this.collectionName);
    const account = await collection.findOne({ email });
    if (!account) {
      return false;
    }
    return account as unknown as Account;
  }
}
