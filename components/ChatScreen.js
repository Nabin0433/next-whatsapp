import { useRef, useState } from "react";
import firebase from "firebase";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  Mic,
  Camera,
} from "@material-ui/icons";
import TimeAgo from "timeago-react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../helpers/firebase";
import Message from "./Message";
import getRecipientEmail from "../helpers/getRecipientEmail";
const ChatScreen = ({ chat, messages }) => {
  const EndOfMessageRef = useRef(null);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("lastSeen", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      ?.where("email", "==", getRecipientEmail(chat.users, user))
  );

  const [input, setInput] = useState("");

  const showMessage = () => {
    if (messageSnapshot) {
      return messageSnapshot?.docs.map((message) => (
        <Message
          key={message.id}
          // user={message.data().user}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const getRecipienEmail = getRecipientEmail(chat?.users, user);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoUrl: user.photoURL,
    });
    setInput("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    EndOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoUrl} />
        ) : (
          <Avatar>{getRecipienEmail?.[0]}</Avatar>
        )}
        <HeaderInfo>
          <h4>{getRecipienEmail}</h4>
          {recipientSnapshot ? (
            <p>
              Last active :{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unabileable"
              )}{" "}
            </p>
          ) : (
            <p> Loading ....</p>
          )}
        </HeaderInfo>
        <HeaderIcon>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcon>
      </Header>
      <MessageContainer>
        {showMessage()}
        <EndOfMessage ref={EndOfMessageRef} />
      </MessageContainer>
      <InputContanier>
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" onClick={sendMessage} hidden disabled={!input}>
          Send Massage
        </button>
        <IconButton>
          <Camera />
        </IconButton>
        <IconButton>
          <Mic />
        </IconButton>
      </InputContanier>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  display: flex;
  padding: 10px;
  top: 0;
  background-color: #fff;
  z-index: 999;
  height: 85px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;
  > h4 {
    margin-bottom: 2px;
  }
  > p {
    font-size: 13px;
    color: #2c2c2c;
  }
`;

const HeaderIcon = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;

const InputContanier = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  z-index: 999;
`;

const Input = styled.input`
  flex: 1;
  padding: 20px;
  background-color: whitesmoke;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;
