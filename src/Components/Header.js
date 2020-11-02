import React, { useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
// import { gql } from "apollo-boost";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, Logo, User, Notification } from "./Icons";
import { useQuery } from "@apollo/client";
import { ME } from "../SharedQueries";

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const NotificationSpace = styled.button`
  margin-right: 23px;
  margin-left: -5px;
  display: inline;
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
`;

const Text = styled.p`
  display: block;
  margin-left: 32px;
  margin-top: -24px;
  color: black;
  font-weight: bold;
  font-size: 20px;
  font-family: "Vampiro One";
`;

export default withRouter(({ history }) => {
  // props에서 history를 가저온다!
  const search = useInput(""); //이것은 훅이다. onChange와 value를 준다!
  const { data } = useQuery(ME);
  // if (data !== undefined) {
  //   console.log(data.me);
  // }
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`); // 위치로 보낸다!
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
            <Text>Kwangstagram</Text>
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            {/* 위에 정의해놨음!! 온서치서브밋! */}
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/like">
            <HeartEmpty />
          </HeaderLink>
          <NotificationSpace>
            <Notification />
          </NotificationSpace>
          {/* <Popover
            isOpen={isPopoverOpen}
            position={"top"} // preferred position
            content={<div>Hi! I'm popover content.</div>}
          >
            <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
              Click me!
            </div>
          </Popover> */}
          {!(data !== undefined && data.me) ? (
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={data.me.username}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
