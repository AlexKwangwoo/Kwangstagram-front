import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/client";
import {
  CREATE_ACCOUNT,
  LOG_IN,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  // const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const secret = useInput("");
  const email = useInput("bnc3049@gmail.com");
  const [requestSecretMutation] = useMutation(LOG_IN, {
    //업데이트는 mutation이 발생할때 내가 실행하는 함수임!
    // 업데이트는 mutation의 result를 얻는 방법임!
    variables: { email: email.value },
  });
  //useInput 은 나에게 email과 value를 줄것임
  // []로 시크릿 을 감싸줘야함.. 새버전이라 그럼!

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          // requestSecret으로 data가 오면 data속의 requestsecret을 가져온다
          if (!requestSecret) {
            toast.error("You don't have an account yet, create one");
            setTimeout(() => setAction("signUp"), 2000);
          } else {
            toast.success("Check your inbox for your login secret!");
            setAction("confirm");
          }
        } catch (error) {
          toast.error("Can't reqeust secret, try again");
        }
      } else {
        toast.error("Email is required");
      }
      // } else if (action === "signUp") {
      //   toast.error("Email is required");
      //html5가 지원안되는곳은
      // 자동으로 에러 please fill out his field 이런게 안떠서 다음과 같이
      // 준비해준다! 밑에도 대비해둔것!
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success("Account created! Log In now");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All field are required");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          console.log(token); //토큰을 가질수 있다 시크릿단어가 맞을시!
          // To Do : log user in
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            //토큰이 없으면!!
            throw Error();
          }
        } catch {
          toast.error("Can't confirm secret, check again");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      // password={password}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
