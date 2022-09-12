import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Divider } from "@mui/material";
import Rating from '@mui/material/Rating';
import EmailPopup from "../Popup/emailPopup";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import Tooltip from '@mui/material/Tooltip';
import StyleIcon from '@mui/icons-material/Style';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import SimpleBackdrop from "../Backdrop";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useRouter } from "next/router";
import FullScreenDialog from "../Popup";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '5px', transform: 'scale(0.8,0.7)' }}
  >
  </Box>
);




const Container = styled.div`
  display: flex;
  height: 100%;
  background: #26eb8b39;
  flex-direction: row;
  align-items: flex-start;
  /* @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  } */
 
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: flex-start;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
  }
`;
const MessageContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  background: #faae6b;
`;

// const MessageDiv = styled.div`
//   display: flex;
//   justify-content:"flex-end";
//   margin: 5px 15px;
// `;
const Message = styled.div`
  background: "#daf8cb";
  padding: 8px 10px;
  border-radius: 4px;
  max-width: 50%;
  color: #101010;
  font-size: 22px;
`;

const Priority_sort=styled.div`
  display:inline-flex;
  flex-direction: column;
  width:800px;
  position: absolute;
  align-items:flex-start;
  cursor: pointer;
`;

const MessageArea=({val,children})=> {
//   const { selectedChat, userInfo, refreshContactList } = props;
  const [text, setText] = useState("");
  const [resultBox, setresultBox] = useState(false)
  const [pickerVisible, togglePicker] = useState(false);
  const [arr_vals, setarr_vals] = useState(val);
  const [loading, setloading] = useState(false)
  const [user_tweets, setuser_tweets] = useState([])
  const [open_pop, setopen_pop] = useState(false)
  const setBox=(val)=>{
  setresultBox(val);
}
 const router=useRouter();
  const UpdateRating=async(val,id)=>{
    // console.log(val,id);
    let response= await fetch('/api/send',{
      method:"PUT",
      body:JSON.stringify({"priority":val,"id":id}),
    })
    // console.log(response);
  }
//   useEffect(() => {
//     setMessageList(selectedChat.channelData.messages);
//   }, [selectedChat]);

//   const onEnterPress = async (event) => {
//     let channelId = selectedChat.channelData._id;
//     if (event.key === "Enter") {
//       if (!messageList || !messageList.length) {
//         const channelUsers = [
//           {
//             email: userInfo.email,
//             name: userInfo.name,
//             profilePic: userInfo.imageUrl,
//           },
//           {
//             email: selectedChat.otherUser.email,
//             name: selectedChat.otherUser.name,
//             profilePic: selectedChat.otherUser.profilePic,
//           },
//         ];
//         const channelResponse = await httpManager.createChannel({
//           channelUsers,
//         });
//         channelId = channelResponse.data.responseData._id;
//       }
//       refreshContactList();
//     //   const messages = [...messageList];
//     const message=["mam","Asdda"]
//       const msgReqData = {
//         text,
//         senderEmail: userInfo.email,
//         addedOn: new Date().getTime(),
//       };
//       const messageResponse = await httpManager.sendMessage({
//         channelId,
//         messages: msgReqData,
//       });
//       messages.push(msgReqData);
//       setMessageList(messages);
//       setText("");
//     }
//   };


const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setresultBox(false);
  };

  const Close_pop=()=>{
    setopen_pop(false);
  }

const showTweets=async()=>{
      setloading(true);
      const user_loc=router.query.user;
      const result =await fetch('/api/update_tweet',{
      method:"POST",
      body: JSON.stringify({"location":user_loc})
      });
      const tweets_asso=await result.json();
      setuser_tweets(tweets_asso.tweets);
      setloading(false);
      setresultBox(true);
}


  return (
    <Container>
        {children}
      {/* <ProfileHeader>
        <ProfileInfo>
          <ProfileImage src={selectedChat.otherUser.profilePic} />
          <ContactName>{selectedChat.otherUser.name}</ContactName>
        </ProfileInfo>
        style={{cursor:"pointer",display:"inline-flex",width:800,}}
      </ProfileHeader> */}
      {/* {console.log(
        children.props
      )} */}
      <MessageContainer> 
        <Priority_sort>
           <Tooltip title="Sort tweets by priority">
      <CategoryRoundedIcon onClick={()=>{
        arr_vals.sort((v1,v2)=>v2.Priority-v1.Priority)
        setarr_vals([...arr_vals]);
        }}></CategoryRoundedIcon>
           </Tooltip>
          <Box sx={{ m: 0.5 }} />
           <Tooltip title="Change or add mail address">
           <MarkEmailUnreadIcon onClick={()=>setopen_pop(true)}/>
           </Tooltip>
        </Priority_sort>
        {loading && <SimpleBackdrop/>}

        {arr_vals.map((message) => {
          return (
              <Message key={message._id}>
<Card sx={{ minWidth:700,maxWidth:750,maxHeight:350,minHeight:150 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {message.tweet}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" >
          Time of Tweet: {message.Time_of_tweet}
        </Typography>
        {message.tweet_associated_place?(
        <Typography variant="body2" >
          This tweet belongs to the {message.tweet_associated_place?message.tweet_associated_place:(message.tweeter_location?message.tweeter_location:"location not provided")} station
          <br />
          Tweeted by: {message["User name"]}
        </Typography>
        ):(
          <></>
        )}
      </CardContent>
      <Typography align="right">
      <Rating name="size-medium" align="left" defaultValue={message.Priority} onClick={(e)=>UpdateRating(e.target.value,message._id)} />
      </Typography>
    </Card>
                <Divider />
              </Message>
          );
        })}
      </MessageContainer>
      {open_pop && <EmailPopup flag={open_pop} flagfunc={Close_pop}/>}
      {/* <MessageContainer>
        {messageList?.map((messageData) => (
          <MessageDiv >
            <Message>
              {[messageData]}
            </Message>
          </MessageDiv>
        ))}
      </MessageContainer> */}
              {/* <SearchContainer></SearchContainer> */}
{pickerVisible && (
            <Picker
              pickerStyle={{ position: "absolute", bottom: "60px" }}
              onEmojiClick={(e, emoji) => {
                setText(text + emoji.emoji);
                togglePicker(false);
              }}
            />
          )}

    {(user_tweets && resultBox)?(
    <FullScreenDialog user_tweets={user_tweets} open={resultBox} setOpen={setBox}></FullScreenDialog>
    ):(
      <>
      {(resultBox)?
      (<>
       <Snackbar open={resultBox} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="info" onClose={handleClose} sx={{ width: '100%' }}>No tweets found</Alert>
        </Snackbar>
      </>):
      (<></>)
      }
      </>
    )
    }
      {/* <ChatBox>

          <EmojiImage
            src={"/whatsapp-clone/data.svg"}
            onClick={() => togglePicker((pickerVisible) => !pickerVisible)}
          />
          <SearchInput
            placeholder="Type a message"
            value={text}
            onKeyDown={onEnterPress}
            onChange={(e) => setText(e.target.value)}
          />
        </SearchContainer>
      </ChatBox> */}
    </Container>
  );
}


export default MessageArea;