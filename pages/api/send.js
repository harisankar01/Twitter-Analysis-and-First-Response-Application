import { Db, Int32, ObjectId } from 'mongodb'
import { connectToDatabase } from "../../src/service/db";
export default async function(req,res){
const { method } = req;
switch (method) {
     case 'POST':
      try {
        console.log(req.body);
        const db=await connectToDatabase()
        db.collection("chat").insertOne(req.body);
        res.status(201).json({ success: true})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
     case 'PUT':
       try{
         const db=await connectToDatabase()
        const result=JSON.parse(req.body);
        const prior=new Int32(result.priority)
        const ID=new ObjectId(result.id)
        console.log(prior,ID);
        db.collection("tweets").updateOne(
            {_id:ID},
            {$set:
              {
               Priority: prior
              }
            }
          )
        res.status(201).json({ success: true})
       }
       catch(e){
          console.error(e);
       }
}
}
