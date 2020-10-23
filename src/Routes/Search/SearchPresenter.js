import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  min-height: 70vh;
`;

const Section = styled.div`
  margin-left: 3%;
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 160px;
  grid-auto-row: 160px;
`;
//4번 반복을 1fr씩 한다/.. 1fr은 1등분 이라보면됨.. 즉 1:1:1:1 크기로 넣음!

const PostSection = styled.div`
  margin-left: 3%;
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 200px);
  grid-auto-rows: 200px;
  margin-left: 3%;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text="Search for something" />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No Users Found" />
          ) : (
            data.searchUser.map((user) => (
              <UserCard
                key={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
            data.searchPost.map((post) => (
              <SquarePost
                key={post.id}
                id={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
                comments={post.comments}
                user={post.user}
                likes={post.likes[0]}
                isLiked={post.isLiked}
                createdAt={post.createdAt}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  } else {
    window.location.reload();
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
};

export default SearchPresenter;
