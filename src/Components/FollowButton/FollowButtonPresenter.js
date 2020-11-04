import React from "react";
import Button from "../Button";

// eslint-disable-next-line
export default ({ isFollowing, onClick }) => (
  <Button text={isFollowing ? "Unfollow" : "Follow"} onClick={onClick} />
);
