import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../helpers/firebase";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);
  const TypeofMessage = user === userLoggedIn.email ? Sender : Reciever;
  return (
    <Container>
      <TypeofMessage>
        {message.message}
        {message.timestamp ? (
          <TimeStamp>{moment(message.timestamp).format("LT")}</TimeStamp>
        ) : (
          "......."
        )}
      </TypeofMessage>
    </Container>
  );
};

export default Message;

const Container = styled.div``;

const MassageElement = styled.p`
  width: fit-content;
  padding: 20px;
  border-radius: 6px 20px;
  margin: 11px;
  min-width: 55px;
  padding-bottom: 20px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MassageElement)`
  margin-left: auto;
  background-color: #dcf8c9;
`;
const Reciever = styled(MassageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const TimeStamp = styled.span`
  color: grey;
  padding: 25px 9px;
  font-size: 9px;
  position: absolute;
  buttom: 0;
  text-align: right;
  right: 0;
`;
