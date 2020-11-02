import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { Logo, Phone, LetterB } from "../../Components/Icons";

const Bigbox = styled.div`
  height: 100%;
  weight: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImageBox = styled.div`
  margin-right: 30px;
`;

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LetterBox = styled.div`
  margin-left: 25px;
  margin-bottom: 25px;
`;

const TextBox = styled.p`
  margin-bottom: 5px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.darkGreyColor};
`;

const TextBox2 = styled(TextBox)`
  margin-bottom: 25px;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 25px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  username,
  // password,
  firstName,
  lastName,
  email,
  setAction,
  onSubmit,
  secret,
}) => (
  <Bigbox>
    <ImageBox>{action === "logIn" && <Phone />}</ImageBox>
    <Wrapper>
      <Form>
        {action === "logIn" && (
          <>
            <Helmet>
              <title>Log In | Prismagram</title>
            </Helmet>
            <LetterBox>
              <LetterB />
            </LetterBox>
            <TextBox>Sign up to see photos and videos</TextBox>
            <TextBox2>from your friends.</TextBox2>
            <form onSubmit={onSubmit}>
              <Input placeholder={"Email"} {...email} type="email" />
              <Button text={"Log in"} />
            </form>
          </>
        )}
        {action === "signUp" && (
          <>
            <Helmet>
              <title>Sign Up | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input placeholder={"First name"} {...firstName} />
              <Input placeholder={"Last name"} {...lastName} />
              <Input placeholder={"Email"} {...email} type="email" />
              <Input placeholder={"Username"} {...username} />
              <Button text={"Sign up"} />
            </form>
          </>
        )}
        {action === "confirm" && (
          <>
            <Helmet>
              <title>Confirm Secret | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input placeholder="Paste your secret" required {...secret} />
              <Button text={"Confirm"} />
            </form>
          </>
        )}
      </Form>
      {action !== "confirm" && (
        <StateChanger>
          {action === "logIn" ? (
            <>
              Don't have an account?{" "}
              <Link onClick={() => setAction("signUp")}>Sign up</Link>
            </> // setAction은 리액트 훅으로 위의 action값을 변경한다
          ) : (
            <>
              Have an account?{" "}
              <Link onClick={() => setAction("logIn")}>Log in</Link>
            </>
          )}
        </StateChanger>
      )}
    </Wrapper>
  </Bigbox>
);
