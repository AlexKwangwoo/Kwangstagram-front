import React from "react";
import { ToastContainer, toast } from "react-toastify"; //알림설정!
import "react-toastify/dist/ReactToastify.css";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { gql } from "apollo-boost";
import Routes from "./Components/Routes";
import GlobalStyles from "./Styles/GlobalStyles";
import Theme from "./Styles/Theme";
import { useQuery } from "@apollo/react-hooks";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`; // 클라이언트 쿼리다. API로 보내버리면안되기에 client지정함!

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY); //api로 안넘김

  return (
    <ThemeProvider theme={Theme}>
      {/* 여기서 Theme에서받은 theme은 css reset으로 props넘겨준다! */}
      <>
        <GlobalStyles />
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        {/* //알림위치 */}
      </>
    </ThemeProvider>
  );
};
