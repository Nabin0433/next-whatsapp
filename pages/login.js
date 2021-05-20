import { Button } from "@material-ui/core";
import Head from "next/Head";
import styled from "styled-components";
import { auth, provider } from "../helpers/firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Watsapp Login</title>
      </Head>
      <LoginContainer>
        <Logo
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="Logo"
        />
        <Button onClick={signIn} variant="outlined">
          Login With Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #fff;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 110px 80px;
  align-items: center;
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: 0px 3px 11px -4px rgba(0, 0, 0, 0.6);
`;
const Logo = styled.img`
  height: 150px;
  width: 150px;
  margin-bottom: 40px;
  margin-left: 10px;
  transform: rotateZ(350deg);
`;
