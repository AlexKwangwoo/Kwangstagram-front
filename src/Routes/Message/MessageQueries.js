import { gql } from "apollo-boost";

export const ADD_MESSAGE = gql`
  mutation sendMessage($roomId: String, $message: String!, $toId: String!) {
    sendMessage(roomId: $roomId, toId: $toId, message: $message) {
      id
      text
      room {
        id
        participants {
          id
        }
      }
      createdAt
    }
  }
`;

export const NEW_MESSAGE = gql`
  mutation sendMessage($message: String!, $toId: String!) {
    sendMessage(toId: $toId, message: $message) {
      id
      text
      room {
        participants {
          id
        }
      }
      createdAt
    }
  }
`;

// export const ADD_COMMENT = gql`
//   mutation addComment($postId: String!, $text: String!) {
//     addComment(postId: $postId, text: $text) {
//       id
//       text
//       user {
//         username
//         avatar
//       }
//     }
//   }
// `;
