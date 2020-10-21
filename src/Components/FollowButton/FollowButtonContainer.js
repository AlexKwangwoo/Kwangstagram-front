import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });
  const onClick = () => {
    if (isFollowingS === true) {
      //팔로우하고있던 친구를 눌렀는데 true였으면
      // 팔로우 안한다는 뜻이므로 false 넘기고
      setIsFollowing(false);
      unfollowMutation(); // db에 unfollow를 실행요청한다!
      window.location.reload();
    } else {
      setIsFollowing(true);
      followMutation();
      window.location.reload();
    }
  };
  return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />;
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;
