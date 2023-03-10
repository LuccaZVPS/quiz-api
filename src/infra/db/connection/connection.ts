import { MongoClient, Collection } from "mongodb";
export const MongoHelper = {
  connection: null as unknown as MongoClient,
  async connect(url: string): Promise<void> {
    this.connection = await MongoClient.connect(url);
  },

  async disconnect(): Promise<void> {
    await this.connection.close();
  },
  getCollection(name: string): Collection {
    return this.connection.db().collection(name);
  },
};
