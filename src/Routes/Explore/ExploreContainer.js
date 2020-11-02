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

// Wrapper.test:nth-child(1){

// }

const MidLoadder = styled.div`
  margin-top: -350px;
`;

const Grid = styled.div`
  &:nth-child(7) {
    grid-column: 3 / 5;
    grid-row: 1 / 3;
  }
  &:nth-child(9) {
    grid-column: 1 / 4;
    grid-row: 3 / 6;
  }
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
            <Grid>
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
            </Grid>
          ))}
      </Wrapper>
    );
  } else {
    window.location.reload();
    return null;
  }
};
