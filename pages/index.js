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
// db.mycoll.aggregate([
//     {Prediction:"1.0"},
//     { $sample: { size: 1 } }
// ])
export const getServerSideProps=async()=>{
  let db=await connectToDatabase(); 
  let val= JSON.parse(JSON.stringify(await db.collection("C1").aggregate([
    { $match:{Prediction:"1.0"}},
    { $sample: { size: 20 } }
]).toArray()));
return {
    props:{
      val
    }
}
}