import Layout from "../../components/Sidebar/Layout"
import MessageArea from "../../components/messageArea"
import { connectToDatabase } from "../../src/service/db"
import { useRouter } from "next/router"
import { useEffect } from "react"


export default function Home({val}) {
  const router=useRouter();
  useEffect(() => {
    (async()=>(
      await fetch('/api/update_tweet',{
      method:"PUT",
      body:JSON.stringify({"tweets":val,"user_loc":router.query.user}),
    })
    )
    )
  }, [])
  
  return (
<>
<MessageArea val={val}>
  <Layout>
  </Layout>
</MessageArea>


</>
  )
}
export const getServerSideProps=async()=>{
  let db=await connectToDatabase(); 
  let val= await db.collection("tweets").find(
    {Prediction:"1.0"}).sort({$Time_of_tweet:-1}).toArray();
    val=JSON.parse(JSON.stringify(val))
      // val[0].tweet_associated_place
return {
    props:{
      val
    }
}
}