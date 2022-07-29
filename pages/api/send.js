import { Db, ObjectId } from 'mongodb'
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
        const {user_id,imgUrl,user}=req.body;
        const id=new ObjectId(user_id);
          db.collection("login_page").updateOne(
            {_id:id},
            {$set:
              {
               profile_image: imgUrl
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
