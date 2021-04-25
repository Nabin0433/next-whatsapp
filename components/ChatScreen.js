import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, MoreVert } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../helpers/firebase";
const ChatScreen = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessage = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
  };

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInfo>
          <h4>email@gdej.com</h4>
          <p>Lastseen..</p>
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
        <EndOfMessage />
      </MessageContainer>
      <InputContanier>
        <InsertEmoticon />
        <Input />
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

const MessageContainer = styled.div``;

const EndOfMessage = styled.div``;

const InputContanier = styled.div``;


const Input = styled.div``;
