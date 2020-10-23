import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import FollowButton from "../../Components/FollowButton";
import { Scrollbars } from "react-custom-scrollbars";

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: "rgba(35, 49, 86, 0.8)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = (props) => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

const Wrapper = styled.div`
  width: 300px;
  position: fixed;
  padding-left: 20px;
`;

const Header = styled.header``;

const HeaderColumn = styled.div`
  display: flex;
  align-items: center;
  a {
    color: inherit;
  }
`;

const Username = styled.p`
  margin-left: 20px;
  font-size: 15px;
`;

const FollowingFriends = styled.p`
  margin-top: 30px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.lightGreyColor};
`;

const FollowingColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderColumn_f = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  a {
    color: inherit;
  }
`;

const ButtonPrison = styled.div`
  width: 80px;
  text-align: right;
  margin-left: auto;
  margin-right: 15px;
`;

const BottomTextFirst = styled.p`
  color: ${(props) => props.theme.lightGreyColor};
  display: block;
  text-align: left;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 12px;
`;

const BottomText = styled.p`
  color: ${(props) => props.theme.lightGreyColor};
  display: block;
  text-align: left;
  margin: auto;
  margin-bottom: 10px;
  font-size: 12px;
`;

const BottomTextLast = styled.p`
  color: ${(props) => props.theme.lightGreyColor};
  display: block;
  text-align: left;
  margin: auto;
  margin-top: 20px;
  font-size: 12px;
`;

export default ({ username, avatar, following }) => {
  // console.log("haha");
  // console.log(follower);
  return (
    <Wrapper>
      <Header>
        <HeaderColumn>
          <Link to={`/${username}`}>
            <Avatar size="mdlg" url={avatar} />
          </Link>
          <Link to={`/${username}`}>
            <Username>{username}</Username>
          </Link>
        </HeaderColumn>
        <FollowingFriends>Your Following Friends</FollowingFriends>
        <FollowingColumn>
          <CustomScrollbars
            style={{ width: 300, height: 350 }}
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
          >
            {following &&
              following.map((following) => (
                <HeaderColumn_f key={following.id}>
                  <Link to={`/${following.username}`}>
                    <Avatar size="sm" url={following.avatar} />
                  </Link>

                  <Link to={`/${following.username}`}>
                    <Username>{following.username}</Username>
                  </Link>
                  <ButtonPrison>
                    <FollowButton
                      isFollowing={following.isFollowing}
                      id={following.id}
                    />
                  </ButtonPrison>
                </HeaderColumn_f>
              ))}
          </CustomScrollbars>
        </FollowingColumn>
      </Header>
      <BottomTextFirst>
        About &middot; Help &middot; Press &middot; API &middot; Job &middot;
        Privacy &middot; Terms
      </BottomTextFirst>
      <BottomText>
        Locations &middot; Top Accounts &middot; Hashtags &middot; Language
      </BottomText>
      <BottomTextLast>© 2020 KWANGSTAGRAM FROM FACEBOOK</BottomTextLast>
    </Wrapper>
  );
};

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
