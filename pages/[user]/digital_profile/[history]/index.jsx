import React,{useContext}from 'react'
import { ThemeProvider } from 'styled-components'
import TweetDisplay from '../../../../components/GreatArea/Main/mainaic'
import Chat from "../../../../components/GreatArea/Side/index"
import { ThemeContext, ThemeContextProvider } from '../../../../components/GreatArea/Side/theme'

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
export default function Departments({val,calue}) {
      const context = useContext(ThemeContext);
    const { theme } = context;
  return (

  <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <Chat val={val}></Chat>
    <TweetDisplay data={val} tweets={calue}></TweetDisplay>
    </ThemeProvider>

  )
}
export const getServerSideProps=async(context)=>{
    let name=context.query.history
    const anlyser_url=process.env.TWEET_ANALYSER +`info?name=${name}`
      let val= await fetch(anlyser_url,{
      method:"GET",
    }).then((r)=>r.json())
    const url=process.env.BACKEND_URL+`user?name=${name}`;
    let calue=await fetch(url,{
      method:"GET",
    }).then((r)=>r.json())
        
return {
    props:{
      val,calue
    }
}
}