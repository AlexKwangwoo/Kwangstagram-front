import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import MidFeedPost from "./MidFeedPost";
import MidFeedUser from "./MidFeedUser";
// import { useQuery } from "@apollo/client";

const Split = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export default withRouter(() => {
  // const { data, loading } = useQuery(FEED_QUERY);
  // console.log(data, loading);
  return (
    <Split>
      <MidFeedPost></MidFeedPost>
      <MidFeedUser></MidFeedUser>
    </Split>
  );
});
