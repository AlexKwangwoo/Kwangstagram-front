// import React from "react";
// import styled from "styled-components";
// import { Helmet } from "react-helmet";
// import Loader from "../../Components/Loader";
// import Avatar from "../../Components/Avatar";
// import FatText from "../../Components/FatText";
// import FollowButton from "../../Components/FollowButton";
// import SquarePost from "../../Components/SquarePost";
// import Button from "../../Components/Button";
// import { useMutation } from "@apollo/client";
// import useInput from "../../Hooks/useInput";
// import { ADD_COMMENT } from "../../Components/Post/PostQueries";

// const Wrapper = styled.div`
//   min-height: 100vh;
// `;

// const Header = styled.header`
//   display: flex;
//   align-items: center;
//   justify-content: space-around;
//   width: 80%;
//   margin: 0 auto;
//   margin-bottom: 40px;
// `;

// const HeaderColumn = styled.div``;

// const HeaderColumn_R = styled.div`
//   width: 300px;
// `;

// const UsernameRow = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Username = styled.span`
//   width: 200px;
//   font-size: 22px;
//   display: block;
//   margin-right: 20px;
// `;

// const ButtonPrision = styled.div`
//   width: 40%;
// `;

// const Counts = styled.ul`
//   display: flex;
//   margin: 15px 0px;
// `;

// const Count = styled.li`
//   font-size: 16px;
//   &:not(:last-child) {
//     margin-right: 10px;
//   }
// `;

// const FullName = styled(FatText)`
//   font-size: 16px;
// `;

// const Bio = styled.p`
//   margin: 10px 0px;
// `;

// const Line = styled.div`
//   width: 100%;
//   height: 0;
//   border: 0.1px solid;
//   border-color: ${(props) => props.theme.lightGreyColor};
//   margin-bottom: 40px;
// `;

// const Posts = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 300px);
//   grid-gap: 20px;
//   grid-template-rows: 300px;
//   grid-auto-rows: 300px;
// `;

// export default ({ loading, data, logOut }) => {
//   console.log("프레젠터 시작함!");
//   if (loading === true) {
//     return (
//       <Wrapper>
//         <Loader />
//       </Wrapper>
//     );
//   } else if (!loading && data && data.seeUser) {
//     console.log("왜씹혀");
//     const {
//       seeUser: {
//         id,
//         avatar,
//         username,
//         fullName,
//         isFollowing,
//         isSelf,
//         bio,
//         followingCount,
//         followersCount,
//         postsCount,
//         posts,
//       },
//     } = data;
//     const comment = useInput("");
//     console.log(comment.value);
//     const [selfComments, setSelfComments] = useState([]);
//     const [addCommentMutation] = useMutation(ADD_COMMENT, {
//       variables: { postId: id, text: comment.value },
//     }); // useInput을 통해 value와 unchanged를 준다!
//     const onKeyPress = async (event) => {
//       const { which } = event;
//       if (which === 13) {
//         event.preventDefault();
//         //13은 keycode로 엔터인데.. 엔터지면 이벤트 멈춤!
//         try {
//           const {
//             data: { addComment },
//           } = await addCommentMutation();
//           // 일단 데이터베이스에 저장할 것이다!
//           setSelfComments([...selfComments, addComment]);
//           comment.setValue("");
//         } catch {
//           toast.error("Cant send comment");
//         }
//       }
//     };
//     console.log("comment test");
//     console.log(comment);
//     return (
//       <Wrapper>
//         <Helmet>
//           <title>{username} | Kwangstagram</title>
//         </Helmet>
//         <Header>
//           <HeaderColumn>
//             <Avatar size="lg" url={avatar} />
//           </HeaderColumn>
//           <HeaderColumn_R>
//             <UsernameRow>
//               <Username>{username}</Username>
//               <ButtonPrision>
//                 {isSelf ? (
//                   <Button onClick={logOut} text="Log Out" />
//                 ) : (
//                   <FollowButton isFollowing={isFollowing} id={id} />
//                 )}
//               </ButtonPrision>
//             </UsernameRow>
//             <Counts>
//               <Count>
//                 <FatText text={String(postsCount)} /> posts
//               </Count>
//               <Count>
//                 <FatText text={String(followersCount)} /> followers
//               </Count>
//               <Count>
//                 <FatText text={String(followingCount)} /> following
//               </Count>
//             </Counts>
//             <FullName text={fullName} />
//             <Bio>{bio}</Bio>
//           </HeaderColumn_R>
//         </Header>
//         <Line />
//         <Posts>
//           {posts &&
//             posts.map((post) => (
//               <SquarePost
//                 key={post.id}
//                 likeCount={post.likeCount}
//                 commentCount={post.commentCount}
//                 file={post.files[0]}
//                 user={post.user}
//                 comments={post.comments}
//                 newComment={comment}
//                 onKeyPress={onKeyPress}
//                 selfComments={selfComments}
//               />
//             ))}
//         </Posts>
//       </Wrapper>
//     );
//   }
//   return null;
// };
