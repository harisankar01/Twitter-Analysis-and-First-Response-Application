import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Divider } from "@mui/material";
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '5px', transform: 'scale(0.8,0.7)' }}
  >
    •
  </Box>
);

function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
// import { SearchContainer, SearchInput } from "./ContactListComponent";
// import Picker from "emoji-picker-react";
// import { messagesList } from "../mockData";
// import httpManager from "../managers/httpManager";

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

const MessageArea=({val,children})=> {
//   const { selectedChat, userInfo, refreshContactList } = props;
  const [text, setText] = useState("");
  const [pickerVisible, togglePicker] = useState(false);
  const [messageList, setMessageList] = useState([{"message":"message2","id":1},{"message":"messagwe2","id":2}]);

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
  return (
    <Container>
        {children}
      {/* <ProfileHeader>
        <ProfileInfo>
          <ProfileImage src={selectedChat.otherUser.profilePic} />
          <ContactName>{selectedChat.otherUser.name}</ContactName>
        </ProfileInfo>
      </ProfileHeader> */}
      <MessageContainer>
        {val.map((message) => {
          return (
              <Message key={message._id}>
<Card sx={{ minWidth:700,maxWidth:750,maxHeight:350,minHeight:150 }}>
      <CardContent>
        <Typography sx={{ fontSize: 8 }} color="text.secondary" gutterBottom>
          Department: {message.Department}
        </Typography>
        <Typography variant="h5" component="div">
          {message.tweet}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Time of Tweet: {message.Time_of_tweet}
        </Typography>
        <Typography variant="body2">
          This tweet belongs to the {message.tweet_associated_place?message.tweet_associated_place:(message.tweeter_location?message.tweeter_location:"location not provided")} station
          <br />
          Tweeted by: {message["User name"]}
        </Typography>
      </CardContent>
    </Card>
                <Divider />
              </Message>
          );
        })}
      </MessageContainer>
      {/* <MessageContainer>
        {messageList?.map((messageData) => (
          <MessageDiv >
            <Message>
              {[messageData]}
            </Message>
          </MessageDiv>
        ))}
      </MessageContainer> */}

      {/* <ChatBox>
        <SearchContainer>
          {pickerVisible && (
            <Picker
              pickerStyle={{ position: "absolute", bottom: "60px" }}
              onEmojiClick={(e, emoji) => {
                setText(text + emoji.emoji);
                togglePicker(false);
              }}
            />
          )}
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