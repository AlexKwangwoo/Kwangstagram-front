import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import SlideOnTopContainer from "./SlideOnTop/SlideOnTopContainer";

const GET_ME = gql`
  query me {
    me {
      id
      username
      avatar
      firstName
      following {
        id
        username
        avatar
        isFollowing
        firstName
      }
    }
  }
`;

const SlideOnTopSpace = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 600px;
  height: 100px;
  margin-left: 16px;
  margin-bottom: 20px;
  margin-top: -18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 11px;
  a {
    color: inherit;
  }
`;

// eslint-disable-next-line
export default () => {
  const { data, loading } = useQuery(GET_ME);
  if (loading) {
    return null;
  }
  return (
    <SlideOnTopSpace>
      <SlideOnTopContainer data={data} loading={loading} />
    </SlideOnTopSpace>
  );
};
