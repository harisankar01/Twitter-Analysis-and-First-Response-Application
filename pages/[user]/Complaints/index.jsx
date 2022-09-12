import React,{useContext}from 'react'
import { ThemeProvider } from 'styled-components'
import TweetDisplay from '../../../components/GreatArea/Main'
import Chat from "../../../components/GreatArea/Side/index"
import { ThemeContext, ThemeContextProvider } from '../../../components/GreatArea/Side/theme'
import { connectToDatabase } from '../../../src/service/db'
import { states,location } from '../../../components/Login/states'
const globalTheme = {
    switchWidth: '40px',
    switchHeight: '20px',
    switchPadding: '3px',
    colorContrastLow: '#d3d3d4',
    colorWhite: '#FFF',
    switchColorPrimary: '#302C40',
    switchAnimationDuration: '0.2s',
    gradient: 'linear-gradient(122deg, rgba(128,74,216,1) 0%, rgba(98,75,217,1) 100%)',
    colorGreen: '#5DC399',
    colorGray: '#adadad',
}


const lightTheme = {
    primary: '#FFF',
    secondary: '#F8F8F8',
    textColor: '#585280',
    header: '#585280',
    headerNumber: '#FFF',
    activeMenu: '#585280',
    ...globalTheme
}

const darkTheme = {
    primary: '#302C40',
    secondary: '#2C2839',
    textColor: '#FFF',
    header: '#FFF',
    headerNumber: '#585280',
    activeMenu: '#FFF',
    ...globalTheme
}
export default function Departments({val}) {
      const context = useContext(ThemeContext);
    const { theme } = context;
  return (

  <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <Chat val={val}></Chat>
    <TweetDisplay data={val}></TweetDisplay>
    </ThemeProvider>

  )
}
export const getServerSideProps=async(context)=>{
    let name=context.query.departments;
    let user=context.query.user;
    // console.log(name);
    const user_state_id=(location.loc.find((item)=>item.city_name==user).state_id)
    const user_state_name=states.states.find((i)=>i.state_id==user_state_id).state_name.toUpperCase();
  let db=await connectToDatabase(); 
  console.log(user_state_name);
        let val=JSON.parse(JSON.stringify(await db.collection("tweets").find({$and:[{tweet_associated_place:user_state_name},{Department:"complaints"}]}).toArray()));
  let value= JSON.parse(JSON.stringify(await db.collection("Chat").find({Department: name}).toArray()));
return {
    props:{
      val,value
    }
}
}