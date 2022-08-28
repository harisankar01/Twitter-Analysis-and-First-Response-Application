import { Db, Int32, ObjectId } from 'mongodb'
import { connectToDatabase } from "../../src/service/db";
var Twit = require('twit')
var T = new Twit({
  consumer_key:         "JbYaDTbeBLA1svw8N0rbW9AWc",
  consumer_secret:      "8HOFGU54XuVO7JTPjmM6YXLuxweizpdSKs1NQ5MrFWl8KIplki",
  access_token:         "1438353997765623812-z5JipdSMKkfM1RlwGktOAnzZ7r7E1q",
  access_token_secret:  "PJN3D7IiW2ZdI6QddzoLd3iKb7GwxZIkW0drixv2uYX12",
})
export default async function(req,res){
const { method } = req;
switch (method) {
     case 'POST':
      try {
        console.log(req.body);
        const result=JSON.parse(req.body)
        const msg=result.tweet_msg;
        T.get('search/tweets', { q: `${msg}`, count: 1 }).then(function (response) {
            const userName = response.data.statuses[0].user.screen_name;
            const tweetId = response.data.statuses[0].id_str;
            T.post('statuses/update', { in_reply_to_status_id: tweetId, status: `@${userName}, The issue will be resolved` }, (err, data, response) => {
             console.log(data);
            })
          })
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
