import { Db, Int32, ObjectId } from 'mongodb'
import { connectToDatabase } from "../../src/service/db";
import { states,location } from '../../components/Login/states';
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
        const loc=result.user_loc;
        // const user_state_id=location.loc.find((item)=>item.city_name==loc).state_id
        // const user_state_name=states.states.find((i)=>i.state_id==user_state_id).state_name.toUpperCase()
        // console.log(i.tweet_associated_place);
        result.tweets.forEach(async(i)=>{
        let place=i.tweet_associated_place.split(" ")[0]
        let fina_place=place.charAt(0).toUpperCase() + place.slice(1);
         let j=JSON.parse(JSON.stringify(await db.collection("locations").findOne({"SUB.DISTRICT.NAME":fina_place})))
         let result=await db.collection("users").updateOne({state:j?.STATE?.NAME},{$addToSet:{
        tweets:i._id
        }})
        })
        res.status(201).json({ success: true})
       }
       catch(e){
          console.error(e);
       }
}
}














//    