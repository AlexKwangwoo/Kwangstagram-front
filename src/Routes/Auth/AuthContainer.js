import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT, LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  // const password = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error("You don't have an account yet, create one");
        setTimeout(() => setAction("signUp"), 2000);
      }
    }, //업데이트는 mutation이 발생할때 내가 실행하는 함수임!
    // 업데이트는 mutation의 result를 얻는 방법임!
    variables: { email: email.value },
  });
  //useInput 은 나에게 email과 value를 줄것임
  // []로 시크릿 을 감싸줘야함.. 새버전이라 그럼!

  const createAccount = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        requestSecret();
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      toast.error("Email is required");
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
        createAccount();
      } else {
        toast.error("All field are required");
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
      onSubmit={onSubmit}
    />
  );
};
