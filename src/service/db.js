import * as mongoDB from "mongodb";
export async function connectToDatabase() {
  const client = new mongoDB.MongoClient(process.env.DB_URL);
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  return db;
}
