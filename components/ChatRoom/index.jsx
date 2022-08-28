import styled from "styled-components";
import React, { useRef,useEffect,useState } from 'react'
import ChatInput from "./Send";
import { useRouter } from 'next/router';
const Container = styled.div`
  display: grid;
  grid-template-rows:10% 80% 10% ;
  gap: 0.1rem;
  overflow: scroll;
  height: 280px;
background-color: #080420;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    overflow:scroll
    &::-webkit-scrollbar {
      width: 1rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 100%;
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
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default function Room({chat}) {
console.log(chat);
  const router=useRouter()
  const [msg, setmsg] = useState(chat?chat:[])
  
const handlemsg=async(e)=>{
  const mssg=[...msg]
  mssg.push(e);
  setmsg(mssg)
  let response= await fetch('/api/chat',{
      method:"PUT",
      body:JSON.stringify({
      "tweet_room_id":router.query.chat_room,
      "user":router.query.user,
      "message":e.message
    }),
    })
console.log(response);
}
const scrollRef = useRef();
    useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <Container>
   <div className="chat-messages">
        {msg.map((message,index) => {
          return (
            <div ref={scrollRef} key={index}>
              <div
                className={`message ${
                  message.user_name==router.query.user ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
            <ChatInput handleSendMsg={handlemsg} />
      </Container>
  )
}


