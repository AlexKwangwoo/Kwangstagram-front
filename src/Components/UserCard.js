import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
// import Button from "./Button";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const Card = styled.div`
  ${(props) => props.theme.whiteBox}
  display:flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const EAvatar = styled(Avatar)`
  margin-bottom: 15px;
`; // 아바타 컴포넌트에서 들고와서 추가 옵션을 붙임!

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;
const UserCard = ({ id, username, isFollowing, url, isSelf }) => (
  <Card>
    <EAvatar url={url} size={"md"} />
    <ELink to={`/${username}`}>
      <FatText text={username} />
    </ELink>
    {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
  </Card> // 만약 검색한것중 내자신이 아닐경우에는 follow가 할지 안할지 표시된다!
);

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired,
};

export default UserCard;
