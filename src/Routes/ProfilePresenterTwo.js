import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../Components/Loader";
import Avatar from "../Components/Avatar";
import FatText from "../Components/FatText";
import FollowButton from "../Components/FollowButton";
import SquarePost from "../Components/SquarePost";
import Button from "../Components/Button";
import { HeartFull_S as HeartFullS } from "../Components/Icons";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const HeaderColumnR = styled.div`
  width: 300px;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  width: 200px;
  font-size: 22px;
  display: block;
  margin-right: 20px;
`;

const ButtonPrision = styled.div`
  width: 40%;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Line = styled.div`
  width: 100%;
  height: 0;
  border: 0.1px solid;
  border-color: ${(props) => props.theme.lightGreyColor};
`;
const LineU = styled.div`
  width: 10%;
  margin: auto;
  height: 0;
  border: 0.1px solid;
  border-color: ${(props) => props.theme.darkGreyColor};
`;
const LineT = styled.div`
  width: 10%;
  margin: auto;
  height: 0;
  border: 0.1px solid;
  border-color: ${(props) => props.theme.darkGreyColor};
  margin-bottom: 10px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-gap: 20px;
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
`;

const Text = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin: auto;
  text-align: center;
  margin-bottom: 40px;
`;

const PostText = styled.div`
  display: inline-block;
  margin-left: 5px;
`;

// eslint-disable-next-line
export default ({ loading, data, logOut }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;

    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Kwangstagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumnR>
            <UsernameRow>
              <Username>{username}</Username>
              <ButtonPrision>
                {isSelf ? (
                  <Button onClick={logOut} text="Log Out" />
                ) : (
                  <FollowButton isFollowing={isFollowing} id={id} />
                )}
              </ButtonPrision>
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumnR>
        </Header>
        <LineU />
        <Line />
        <LineT />
        <Text>
          <HeartFullS />
          <PostText>POSTS</PostText>
        </Text>
        <Posts>
          {posts &&
            posts.map((post) => (
              <SquarePost
                key={post.id}
                id={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
                user={post.user}
                comments={post.comments}
                isLiked={post.isLiked}
                likes={post.likes[0]}
                createdAt={post.createdAt}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  } else {
    window.location.reload();
    // 얘는 마지막에 넣어야됨.. 읽다가 있으면 실행되버림
  }
  return null;
};
