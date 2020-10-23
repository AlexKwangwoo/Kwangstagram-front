import React from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ProfilePresenterTwo from "./ProfilePresenterTwo";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        likes {
          user {
            id
            username
            avatar
          }
        }
        user {
          username
          avatar
        }
        files {
          url
        }
        isLiked
        likeCount
        commentCount
        comments {
          text
          user {
            username
            avatar
          }
        }
        createdAt
      }
    }
  }
`;
export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });

    const [logOut] = useMutation(LOG_OUT);
    return (
      <ProfilePresenterTwo loading={loading} logOut={logOut} data={data} />
    );
  }
);
