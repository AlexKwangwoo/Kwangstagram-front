import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      username
      followers {
        id
        createdAt
        username
        avatar
        posts {
          caption
          createdAt
        }
      }
    }
  }
`;
// 백엔드에서 가져온다!!
