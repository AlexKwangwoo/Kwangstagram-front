// import React from "react";
// import { withRouter } from "react-router-dom";
// import styled from "styled-components";
// import MidFeedPost from "../MidFeedPost";
// import MidFeedUser from "../MidFeedUser";
// import MidFeedSlide from "../MidFeedSlide";
// // import { useQuery } from "@apollo/client";

// const Split = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: center;
// `;

// const Updown = styled.div`
//   width: 65%;
// `;

// export default withRouter(() => {
//   console.log("container시작");
//   // const { data, loading } = useQuery(FEED_QUERY);
//   // console.log(data, loading);
//   return (
//     <Split>
//       <Updown>
//         <MidFeedSlide></MidFeedSlide>
//         <MidFeedPost></MidFeedPost>
//       </Updown>
//       <MidFeedUser></MidFeedUser>
//     </Split>
//   );
// });

// // import React from "react";
// // import { gql } from "apollo-boost";
// // import withRouter from "react-router-dom/withRouter";
// // import { useQuery, useMutation } from "@apollo/react-hooks";
// // import ProfilePresenter from "./ProfilePresenter";

// // const GET_USER = gql`
// //   query seeUser($username: String!) {
// //     seeUser(username: $username) {
// //       id
// //       avatar
// //       username
// //       fullName
// //       isFollowing
// //       isSelf
// //       bio
// //       followingCount
// //       followersCount
// //       postsCount
// //       posts {
// //         id
// //         user {
// //           username
// //           avatar
// //         }
// //         files {
// //           url
// //         }
// //         likeCount
// //         commentCount
// //         comments {
// //           text
// //           user {
// //             username
// //             avatar
// //           }
// //         }
// //       }
// //     }
// //   }
// // `;
// // export const LOG_OUT = gql`
// //   mutation logUserOut {
// //     logUserOut @client
// //   }
// // `;

// // export default () => {
// //   console.log("start2before");
// //   return "hahaaaa2";
// // };

// // export default withRouter(
// //   ({
// //     match: {
// //       params: { username },
// //     },
// //   }) => {
// //     console.log("haha");
// //     console.log(username);
// //     const { data, loading } = useQuery(GET_USER, { variables: { username } });
// //     const [logOut] = useMutation(LOG_OUT);
// //     return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
// //   }
// // );
