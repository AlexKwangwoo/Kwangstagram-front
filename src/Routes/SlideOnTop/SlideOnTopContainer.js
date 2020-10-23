import React from "react";
import SlideOnTopPresenter from "./SlideOnTopPresenter";

// const FeedUser = styled.div`
//   width: 200px;
//   border: 2px black solid;
//   height: 300px;
//   flex-grow: 1;
// `;

// const FeedUserConatiner = ({
//   //feed로 부터 받아오는 props들을 이용할것임!
//   // 이건 즉 id : id, user : user라 그냥 저렇게 썼음!
//   // id: id,
//   // user: user,
//   // files: files,
//   // likeCount: likeCount,
//   // isLiked: isLiked,
//   // comments: comments,
//   // createdAt: createdAt,
//   // caption: caption,
//   // location: location,
//   id,
//   user,
// }) => {
//   return <FeedUserPresenter user={user} />;
// };

const SlideOnTopContainer = ({ data, loading }) => {
  if (!loading && data && data.me) {
    const {
      me: { username, avatar, following, firstName },
    } = data;
    // const { data, loading } = useQuery(GET_USER, { variables: { username } });
    return (
      <SlideOnTopPresenter
        username={username}
        avatar={avatar}
        following={following}
        firstName={firstName}
      />
    );
  } else {
    return null;
  }
};

// const FeedUserConatiner = (user) => {
//   return null;
// };
export default SlideOnTopContainer;

// const FeedUserConatiner = ({ user }) => {
//   // const { data, loading } = useQuery(GET_USER, { variables: { user.username } });
//   console.log(user);
//   return <FeedUserPresenter avatar={user} />;
//   // return <FeedUserPresenter loading={loading} data={data} />;
// };
// export default FeedUserConatiner;
