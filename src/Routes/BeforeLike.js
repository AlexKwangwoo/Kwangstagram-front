import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import Loader from "../Components/Loader";
import Like from "./Like";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
        isSelf
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  flex-grow: 4;
`;

const MidLoadder = styled.div`
  margin-left: 0px;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  // console.log(data, loading);
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && (
        <MidLoadder>
          <Loader />
        </MidLoadder>
      )}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => (
          <Like
            key={post.id}
            id={post.id}
            location={post.location}
            caption={post.caption}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  );
};
