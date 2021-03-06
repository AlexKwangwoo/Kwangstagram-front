import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import FeedUser from "./FeedUser";

const GET_ME = gql`
  query me {
    me {
      id
      username
      avatar
      following {
        id
        username
        avatar
        isFollowing
      }
    }
  }
`;

const FeedUserSpace = styled.div`
  width: 200px;
  height: 300px;
  margin-left: 10px;
  flex-grow: 1;
`;

// eslint-disable-next-line
export default () => {
  const { data, loading } = useQuery(GET_ME);
  return (
    <FeedUserSpace>
      <FeedUser data={data} loading={loading} />
    </FeedUserSpace>
  );
};
