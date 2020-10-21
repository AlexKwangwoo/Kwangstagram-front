import React from "react";
import SquarePost from "../../Components/SquarePost";

//4번 반복을 1fr씩 한다/.. 1fr은 1등분 이라보면됨.. 즉 1:1:1:1 크기로 넣음!

const ExplorePresenter = ({ files, likeCount, commentCount }) => {
  return (
    <SquarePost
      likeCount={likeCount}
      commentCount={commentCount}
      file={files[0]}
    />
  );
};
export default ExplorePresenter;

// SearchPresenter.propTypes = {
//   searchTerm: PropTypes.string,
//   loading: PropTypes.bool,
// };
