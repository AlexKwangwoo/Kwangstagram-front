import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT, TOGGLE_LIKE } from "./PostQueries";
// import { ME } from "../../SharedQueries";
import { toast } from "react-toastify";

const PostContainer = ({
  //feed로 부터 받아오는 props들을 이용할것임!
  // 이건 즉 id : id, user : user라 그냥 저렇게 썼음!
  // id: id,
  // user: user,
  // files: files,
  // likeCount: likeCount,
  // isLiked: isLiked,
  // comments: comments,
  // createdAt: createdAt,
  // caption: caption,
  // location: location,
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location,
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  // const { data: meQuery } = useQuery(ME);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  }); // useInput을 통해 value와 unchanged를 준다!
  // console.log(files);
  const slide = () => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  };
  useEffect(() => {
    //처음에 한번 실행된다 componentDidMount
    slide(); //이함수가 작동할려면 [currentItem]이 변경되야한다!
    // eslint-disable-next-line
  }, [currentItem]);

  const toggleLike = () => {
    toggleLikeMutation();
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
      window.location.reload();
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
      window.location.reload();
    } // 즉각 보여주고!!
    // try {
    //   await toggleLikeMutation(); //데이터베이스는 천천히 받는다!
    // } catch {
    //   toast.error("Can't register like");
    // }
  };

  const onKeyPress = async (event) => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      //13은 keycode로 엔터인데.. 엔터지면 이벤트 멈춤!
      try {
        const {
          data: { addComment },
        } = await addCommentMutation();
        // 일단 데이터베이스에 저장할 것이다!
        setSelfComments([...selfComments, addComment]);
        comment.setValue("");
      } catch {
        toast.error("Cant send comment");
      }
    }
  }; //코맨트 엔터와 서칭 엔터가 겹친다! 그래서 현재커서있는곳의 엔터를
  //작동 시켜보자!

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    // 어레이하나하나할때는 arrayOf!!
    PropTypes.shape({
      //object를 풀때는 shape
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

export default PostContainer;
