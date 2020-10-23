import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import Loader from "../../Components/Loader";
import ExplorePresenter from "./ExplorePresenter";

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
      likes {
        user {
          avatar
          username
        }
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
      commentCount
    }
  }
`;

const Wrapper = styled.div`
  margin-left: 3%;
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 200px);
  grid-auto-rows: 200px;
  margin-left: 3%;
`;

const MidLoadder = styled.div`
  margin-top: -350px;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  if (loading === true) {
    return (
      <MidLoadder>
        <Loader />
      </MidLoadder>
    );
  } else if (!loading && data) {
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
            <ExplorePresenter
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
              likes={post.likes[0]}
              commentCount={post.commentCount}
            />
          ))}
      </Wrapper>
    );
  } else {
    window.location.reload();
    return null;
  }
};
