import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";

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

const HeaderColumn_R = styled.div`
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
  margin-bottom: 40px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-gap: 20px;
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
`;

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
          <HeaderColumn_R>
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
          </HeaderColumn_R>
        </Header>
        <Line />
        <Posts>
          {posts &&
            posts.map((post) => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
  return null;
};
