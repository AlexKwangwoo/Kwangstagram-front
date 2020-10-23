import { gql } from "apollo-boost";

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        url
      }
      likes {
        user {
          username
          avatar
        }
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
      user {
        avatar
        username
      }

      createdAt
    }
    searchUser(term: $term) {
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;
