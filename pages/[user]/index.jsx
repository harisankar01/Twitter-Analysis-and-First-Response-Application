import Layout from "../../components/Sidebar/Layout"
import MessageArea from "../../components/messageArea"
import { Geographies } from "react-simple-maps"
import { connectToDatabase } from "../../src/service/db"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { location,states } from "../../components/Login/states"
// import { Map } from "../../components/Map/index"
// await fetch('/api/update_tweet',{
//   method:"PUT",
//   body:JSON.stringify({"tweets":val,"user_loc":router.query.user})
// })
// return ()=>{
//   console.log("sad");
// }

export default function Home({val}) {
  const router=useRouter();
  // useEffect(() => {
  //   (async()=>(
  //     await fetch('/api/update_tweet',{
  //     method:"PUT",
  //     body:JSON.stringify({"tweets":val,"user_loc":router.query.user}),
  //   })
  //   )
  //   )
  // }, [])
  
  return (
<>
<MessageArea val={val}>
  <Layout>
  </Layout>
</MessageArea>
{/* <Map></Map> */}
</>
  )
}
export const getServerSideProps=async(context)=>{
  let db=await connectToDatabase(); 
        let user=context.query.user;
    const user_state_id=(location.loc.find((item)=>item.city_name==user).state_id)
      const user_state_name=states.states.find((i)=>i.state_id==user_state_id).state_name.toUpperCase();
      console.log(user_state_name);
    let value= await db.collection("users").findOne({"state":user_state_name})
      value=JSON.parse(JSON.stringify(value))
      // val[0].tweet_associated_place
      let val= await fetch(`https://twitter-extractor.azurewebsites.net/tweets?domain=${value.handle}`,{
      method:"GET",
    }).then((r)=>r.json())

return {
    props:{
      val
    }
}
}