import React,{useContext}from 'react'
import { ThemeProvider } from 'styled-components'
import TweetDisplay from '../../../components/GreatArea/Main/maini'
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
      let db=await connectToDatabase(); 
        let val=JSON.parse(JSON.stringify(await db.collection("Bad").find({}).toArray()));
return {
    props:{
      val
    }
}
}