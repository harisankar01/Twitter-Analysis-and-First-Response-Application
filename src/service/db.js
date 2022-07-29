import * as mongoDB from "mongodb";
export async function connectToDatabase () {
   let bb="mongodb://tweetdb:H4iDcoBZ6JxvLWsyOIG0xpjUxAfgPKt79sl499xyCvNAGhchbV8y2glpXjWFp4n32iEyHqtmkjLH2GJ9jcde4Q==@tweetdb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@tweetdb@"
   const client = new mongoDB.MongoClient(bb);
   let cc="1"
   await client.connect();
   const db= client.db(cc);
   return db
}