import { Db, Int32, ObjectId } from 'mongodb'
import { connectToDatabase } from "../../src/service/db";
import { states,location } from '../../components/Login/states';
export default async function(req,res){
const { method } = req;
switch (method) {
     case 'POST':
      try {
        const db=await connectToDatabase()
        const loc=JSON.parse(req.body)
        const user_state_id=location.loc.find((item)=>item.city_name==loc.location).state_id
        const user_state_name=states.states.find((i)=>i.state_id==user_state_id).state_name.toUpperCase();
        let result=JSON.parse(JSON.stringify(await db.collection("users").findOne({"state":user_state_name})));

    let tweets_collection=[]
    let final = await Promise.all(result.tweets.map(async (n) => {
    let auth = new ObjectId(n);
    let author = JSON.parse(JSON.stringify(await db.collection("tweets").findOne({ _id: auth })));
    tweets_collection.push(author);
    return tweets_collection
  }))
//   console.log(final);
        res.status(201).json({ "success": true,"tweets":final[0]})
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