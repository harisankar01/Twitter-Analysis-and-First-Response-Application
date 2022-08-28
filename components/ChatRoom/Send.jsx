import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { useRouter } from 'next/router';
const Container = styled.div`
  display: grid;
  align-items: center;
  position: absolute;
  height: max-content;
  grid-template-columns: 100% 10%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: flex-end;
    color: white;
    gap: 1rem;
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 100%;
      height: 10%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default function ChatInput({ handleSendMsg }) {
//   const [msg, setMsg] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const handleEmojiPickerhideShow = () => {
//     setShowEmojiPicker(!showEmojiPicker);
//   };

//   const handleEmojiClick = (event, emojiObject) => {
//     let message = msg;
//     message += emojiObject.emoji;
//     setMsg(message);
//   };
  const router=useRouter();
  const sendChat = (event) => {
    event.preventDefault();
    const sender={
        "message":msg,
        "user_name":router.query.user
    };
    if (msg.length > 0) {
      handleSendMsg(sender);
      setMsg("");
    }
  };
  const [msg, setMsg] = useState("");
  return (
    <Container>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}
