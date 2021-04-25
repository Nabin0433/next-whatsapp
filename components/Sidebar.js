import styled from "styled-components";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { Chat, MoreVert, Search } from "@material-ui/icons";
import { auth, db } from "../helpers/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chats from "./Chat";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);
  const createChat = () => {
    const input = prompt("Enter user Email or Phone number");
    if (!input) {
      return null;
    }
    if (input) {
      if ("valid input" && user.email !== input) {
        db.collection("chats").add({
          users: [user.email, input],
        });
      }
    }
  };

  // check user have old chats
  const checkChats = (recipientEmail) => {
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>
      <SearchLine>
        <IconButton>
          <Search />
        </IconButton>
        <SearchInput placeholder="search" />
      </SearchLine>
      <SidebarButton onClick={createChat}>NEW CHAT</SidebarButton>
      {/* list of chats */}
      {chatsSnapshot?.docs.map((chat) => {
        return <Chats key={chat.id} id={chat.id} users={chat.data().users} />;
      })}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 0.6px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const SearchLine = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const IconsContainer = styled.div``;
