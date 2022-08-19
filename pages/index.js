import Layout from "../components/Sidebar/Layout"
import MessageArea from "../components/messageArea"
import { connectToDatabase } from "../src/service/db";
export default function Home({val}) {
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
  let val= JSON.parse(JSON.stringify(await db.collection("tweets").find(
    {Prediction:"1.0"}).sort({$Time_of_tweet:-1}).limit(25).toArray()));
return {
    props:{
      val
    }
}
}