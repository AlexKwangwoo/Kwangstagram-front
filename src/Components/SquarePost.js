import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  HeartFull,
  CommentFull,
  HeartEmpty,
  Comment as CommentIcon,
} from "./Icons";
import Modal from "react-awesome-modal";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import FatText from "./FatText";
import TextareaAutosize from "react-autosize-textarea";
import useInput from "../Hooks/useInput";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT, TOGGLE_LIKE } from "./Post/PostQueries";
import { toast } from "react-toastify";
import { Scrollbars } from "react-custom-scrollbars";

const Overlay = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s linear;
  svg {
    fill: white;
  }
`;
//transition opacity변화가 일어날때 0.3초 과정을 통해 효력을 발생시킴!
const Container = styled.div`
  height: 100%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  cursor: pointer;
  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

const Div = styled.div`
  display: flex;
`;

const Inside = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  width: 600px;
  height: 600px;
`;

const InsideSecond = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
`;

const DivOne = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-left: ${(props) => props.theme.boxBorder};
`;

const DivTwo = styled.div`
  width: 100%;
  height: 370px;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-left: ${(props) => props.theme.boxBorder};
`;

const DivThree = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-left: ${(props) => props.theme.boxBorder};
`;

const DivFour = styled.div`
  width: 100%;
  height: 60px;
  border-left: ${(props) => props.theme.boxBorder};
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 10px;
`;

const UpBox = styled(Box)`
  margin-top: 18px;
`;
const Text = styled.div`
  width: 80%;
  margin-left: 50px;
`;

const CommentText = styled(FatText)`
  font-weight: 300;
`;

const AText = styled.div`
  margin-left: 10px;
`;

const UpText = styled(FatText)`
  color: black;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 90%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  margin-top: 10px;
  margin-left: 10px;
`;

const CommentBox = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const InsideIcon = styled.div`
  width: 100%;

  margin-left: 10px;
  margin-top: 10px;
`;

const LikeBox = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const LikeText = styled.p`
  display: block;
  margin-left: 10px;
`;

const CreateText = styled.p`
  display: block;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 10px;
`;

const CountNumber = styled.p`
  font-weight: 600;
`;

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: "rgba(35, 49, 86, 0.8)",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const renderThumb_h = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: null,
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = (props) => (
  <Scrollbars
    renderThumbHorizontal={renderThumb_h}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

// const ScrollComment = styled(ReactShadowScroll)`
//   scrollwidth: 5;
// `;

// user: { username, avatar },
const SquarePost = ({
  user,
  commentCount,
  file,
  comments,
  id,
  likeCount,
  isLiked,
  likes,
  createdAt,
}) => {
  const [visible, setVisible] = useState(false);
  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  const commentInside = useInput("");
  const [selfComments, setSelfComments] = useState([]);
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: commentInside.value },
  }); // useInput을 통해 value와 unchanged를 준다!
  const onKeyPress = async (event) => {
    const { which } = event;
    if (which === 13) {
      // console.log("13까지 옴");
      event.preventDefault();
      //13은 keycode로 엔터인데.. 엔터지면 이벤트 멈춤!
      try {
        // console.log("await전까지 옴");
        const {
          data: { addComment },
        } = await addCommentMutation();
        // 일단 데이터베이스에 저장할 것이다!
        // console.log("try까지 옴");
        setSelfComments([...selfComments, addComment]);
        commentInside.setValue("");
      } catch {
        toast.error("Cant send comment");
      }
    }
  };

  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });

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

  return (
    <Container bg={file.url}>
      <Overlay onClick={openModal}>
        <Number>
          <HeartFull />
          <NumberText>{likeCount}</NumberText>
        </Number>
        <Number>
          <CommentFull />
          <NumberText>{commentCount}</NumberText>
        </Number>
      </Overlay>
      <Modal
        visible={visible}
        width="930"
        height="600"
        effect="fadeInUp"
        onClickAway={() => closeModal()}
      >
        <Div>
          <Inside bg={file.url}></Inside>
          <InsideSecond>
            <DivOne>
              <UpBox>
                <Link to={`/${user.username}`}>
                  <Avatar size="sm" url={user.avatar} />
                </Link>
                <AText>
                  <Link to={`/${user.username}`}>
                    <UpText text={user.username} />
                  </Link>
                </AText>
              </UpBox>
            </DivOne>
            <DivTwo>
              <CustomScrollbars
                autoHide
                autoHideTimeout={500}
                autoHideDuration={200}
              >
                {comments &&
                  comments.map((comment, index) => (
                    <CommentBox key={index}>
                      <Box>
                        <Avatar size="sm" url={comment.user.avatar} />
                        <AText>
                          <FatText text={comment.user.username} />
                        </AText>
                      </Box>
                      <Text>
                        <CommentText text={comment.text} />
                      </Text>
                    </CommentBox>
                  ))}
                {selfComments &&
                  selfComments.map((selfComments, index) => (
                    <CommentBox key={index}>
                      <Box>
                        <Avatar size="sm" url={selfComments.user.avatar} />
                        <AText>
                          <FatText text={selfComments.user.username} />
                        </AText>
                      </Box>
                      <Text>
                        <CommentText text={selfComments.text} />
                      </Text>
                    </CommentBox>
                  ))}
              </CustomScrollbars>
            </DivTwo>
            <DivThree>
              <InsideIcon>
                <Buttons onClick={toggleLike}>
                  <Button>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
                  <Button>
                    <CommentIcon />
                  </Button>
                </Buttons>
              </InsideIcon>
              {likeCount > 0 ? (
                <LikeBox>
                  <Avatar size="verySm" url={likes.user.avatar} />
                  <LikeText>
                    Liked by <FatText text={likes.user.username} />
                  </LikeText>
                  <pre> </pre>
                  {likeCount > 1 ? "and" : null}
                  <pre> </pre>
                  {likeCount > 1 ? (
                    <CountNumber>{likeCount}</CountNumber>
                  ) : null}
                  <pre> </pre>
                  {likeCount > 1 ? <FatText text={"others"} /> : null}
                </LikeBox>
              ) : null}
              <CreateText>{createdAt}</CreateText>
            </DivThree>
            <DivFour>
              {commentInside ? (
                <Textarea
                  placeholder={"Add a comment.."}
                  value={commentInside.value}
                  onChange={commentInside.onChange}
                  onKeyPress={onKeyPress}
                />
              ) : null}
            </DivFour>
          </InsideSecond>
        </Div>
      </Modal>
    </Container>
  );
};

SquarePost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.object.isRequired,
};

export default SquarePost;
