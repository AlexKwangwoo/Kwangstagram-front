import React from "react";
import FeedUserPresenter from "./FeedUserPresenter";

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

const FeedUserConatiner = ({ data, loading }) => {
  if (!loading && data && data.me) {
    const {
      me: { username, avatar, following },
    } = data;

    console.log(data, loading);
    // const { data, loading } = useQuery(GET_USER, { variables: { username } });
    return (
      <FeedUserPresenter
        username={username}
        avatar={avatar}
        following={following}
      />
    );
  } else {
    return null;
  }
};

// const FeedUserConatiner = (user) => {
//   return null;
// };
export default FeedUserConatiner;

// const FeedUserConatiner = ({ user }) => {
//   // const { data, loading } = useQuery(GET_USER, { variables: { user.username } });
//   console.log(user);
//   return <FeedUserPresenter avatar={user} />;
//   // return <FeedUserPresenter loading={loading} data={data} />;
// };
// export default FeedUserConatiner;
