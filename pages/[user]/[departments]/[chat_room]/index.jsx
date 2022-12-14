import React from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../src/service/db';
import Divider from '@mui/material/Divider';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Room from '../../../../components/ChatRoom';
import SimpleBackdrop from '../../../../components/Backdrop';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Container = styled(animated.div)`
display: inline-block;
padding: 3em;
justify-content: center;
align-items: center;
background: #abe8e8;
border-radius: 10px;
z-index: 1;
position: relative;
backdrop-filter: blur(10px);
border: 2px solid transparent;
background-clip: border-box;
cursor: pointer;
width: 800px;
height: 300px;
margin-left: 150px;
margin-top: 20px;
`;

const Wrapper = styled.div`
  background-image: url("/static/bg2.jpg");
  height: 100%;
  width: 100%;
  position:absolute;
  background-size: cover;
  
`;

const Column=styled.div`
 display: inline-flex;
 flex-direction: column-reverse;
 margin-left: 60px;
`

const StyledH1 = styled.h1`
    line-height: 1.5;
    letter-spacing: 1.5;
    font-family: "Gilroy";
`;

const StyledH3 = styled.h3`
    line-height: 1.5;
    letter-spacing: 1.15;
    font-family: "Gilroy";
    font-size: 20px;
`;

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const GlassCard = ({val,chat}) => {
  const [loading, setloading] = React.useState(false)
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1] , config: config.default}))
    const router=useRouter();
     const [open, setOpen] = React.useState(false);
     const [open2, setopen2] = React.useState(false)
    const handleClose = () => {
            setOpen(false);
            setopen2(false)
          };
      const ReplyTweet=async()=>{
        setloading(true)
          const msg=val.tweet;
        let response= await fetch('/api/send',{
        method:"POST",
        body:JSON.stringify({
        "tweet_msg":msg,
      }),
      })
      let cal=await response.json();
      setloading(false);
      setopen2(true);
          }
    return (
      <Wrapper>
        <Container
            onMouseMove={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
            onMouseLeave={() => set({xys:[0,0,1]})}
            style={{
                transform: props.xys.to(trans)
            }}
        >
                        <StyledH1>Department of tweet: {val.Department}</StyledH1>
            <StyledH3>{val.tweet}</StyledH3>
                        <Divider light/>
            <StyledH3>Time of tweet: {val.Time_of_tweet}</StyledH3>
            <StyledH3>This tweet belongs to the {val.tweet_associated_place}</StyledH3>
        </Container>
        <Column>
        <Button variant="contained" color="secondary" onClick={()=>{
          console.log(val.Associated_url);
            if(val.Associated_url!="Not available"){
                router.push(val.Associated_url);
            }
            else{
                setOpen(true)
            }
        }}>Visit link</Button>
       <Box sx={{ m: 1 }} />
             {loading && <SimpleBackdrop/>}
        <Button variant="contained" color="secondary" onClick={ReplyTweet} >Reply Tweet</Button>
        </Column>
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          There is no link associated with the tweet
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Replied to tweet successfully
        </Alert>
      </Snackbar>
      <Room chat={chat?.chats}/>
        </Wrapper>
    );
}

export default GlassCard;


export const getServerSideProps=async(context)=>{
  let id=context.query.chat_room
  let ob_id=new ObjectId(id)
  let db=await connectToDatabase(); 
  let val= JSON.parse(JSON.stringify(await db.collection("tweets").findOne(
    {_id:ob_id})));
    let chat=JSON.parse(JSON.stringify(await db.collection("chat").findOne(
      {tweet_room_id:id}
    )));
return {
    props:{
      val,chat
    }
}
}