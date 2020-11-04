import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import Slider from "infinite-react-carousel";

const SildeContainer = styled.div`
  display: flex;
  padding-left: 10px;
`;
const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 0;
`;

const Username = styled.p`
  text-align: center;
  padding-right: 26px;
`;

const WrapperOutside = styled.div`
  width: 100%;
`;

const AvatarTop = styled(Avatar)`
  border: 3px solid #c42d91;
`;

// eslint-disable-next-line
export default ({ username, avatar, following, firstName }) => {
  const settings = {
    slidesToShow: 7,
    arrowsBlock: false,
    autoplay: true,
    autoplayScroll: 2,
    autoplaySpeed: 2000,
    duration: 500,
  };
  // console.log("haha");
  // console.log(follower);
  return (
    <SildeContainer>
      <WrapperOutside>
        <Slider {...settings}>
          <Wrapper>
            <Link to={`/${username}`}>
              <AvatarTop size="mdlg" url={avatar} />
            </Link>
            <Link to={`/${username}`}>
              <Username>{firstName}</Username>
            </Link>
          </Wrapper>

          {following &&
            following.map((following, index) => (
              <Wrapper key={index}>
                <Link to={`/${following.username}`}>
                  <AvatarTop size="mdlg" url={following.avatar} />
                </Link>
                <Link to={`/${following.username}`}>
                  <Username>{following.firstName}</Username>
                </Link>
              </Wrapper>
            ))}
        </Slider>
      </WrapperOutside>
    </SildeContainer>
  );
};

// <Wrapper>
// <Link to={`/${following.username}`}>
//   <Avatar size="mdlg" url={following.avatar} />
// </Link>
// <Link to={`/${following.username}`}>
//   <Username>{following.username}</Username>
// </Link>
// </Wrapper>

// export default ({ user: { username, avatar, isSelf, follower } }) => {
//   console.log(follower);
//   return (
//     <Wrapper>
//       <Header>
//         <HeaderColumn>
//           <Avatar size="mdlg" url={avatar} />
//           {isSelf ? <Username>{username}</Username> : ""}
//         </HeaderColumn>
//         <FollowingFriends>Your Following friends</FollowingFriends>
//       </Header>
//     </Wrapper>
//   );
// };
