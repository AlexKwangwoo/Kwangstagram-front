import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      username
    }
  }
`;
// 백엔드에서 가져온다!!
