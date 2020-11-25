import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../../Components/FatText";
import Avatar from "../../Components/Avatar";
import { Scrollbars } from "react-custom-scrollbars";
import {
  HeartFull,
  HeartEmpty,
  Comment as CommentIcon,
} from "../../Components/Icons";
import { formatDate } from "../../utils";

// const Wrapper = styled.div``;

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 25px;
  margin-right: -25px;
  a {
    color: inherit;
  }
`;
//user-select none하면 클릭시 텍스트 선택이 안됨!
const CommentBox = styled.div`
  height: 70px;
`;
const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`; // showing이 참이면 투명도 1 나머지는 0

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const Caption = styled.div`
  margin: 10px 0px;
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

// eslint-disable-next-line
export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  caption,
}) => {
  // const a = files.map((file, index) => file.url);
  // console.log(a);
  return (
    <>
      {isLiked ? (
        <Post>
          <Header>
            <Avatar size="sm" url={avatar} />
            <UserColumn>
              <Link to={`/${username}`}>
                <FatText text={username} />
              </Link>
              <Location>{location}</Location>
            </UserColumn>
          </Header>
          <Files>
            {files &&
              files.map((file, index) => (
                <File
                  key={file.id}
                  src={file.url}
                  showing={index === currentItem}
                />
              ))}
            {/* currentItem이 0이면 index도0이라면 우리는 0의 숫자를 보여준다 
          current는 계속 바뀔것이고.. 그에따른 사진파일이 보여질것임! */}
          </Files>
          <Meta>
            <Buttons onClick={toggleLike}>
              <Button>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
              <Button>
                <CommentIcon />
              </Button>
            </Buttons>
            <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
            <Caption>
              <FatText text={username} /> {caption}
            </Caption>
            {comments.length > 3 ? (
              <CommentBox>
                <CustomScrollbars
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                >
                  <Comments>
                    {comments.map((comment) => (
                      <Comment key={comment.id}>
                        <FatText text={comment.user.username} />
                        {comment.text}
                      </Comment>
                    ))}
                    {/* 위에꺼는 데이터베이스 저장해서 들고오는용!! */}
                    {selfComments.map((comment) => (
                      <Comment key={comment.id}>
                        <FatText text={comment.user.username} />
                        {comment.text}
                      </Comment>
                    ))}
                    {/* 위에꺼는 내가 당장쓴거 어레이에 저장해서 들고오는용!! */}
                  </Comments>
                </CustomScrollbars>
              </CommentBox>
            ) : (
              <Comments>
                {comments.map((comment) => (
                  <Comment key={comment.id}>
                    <FatText text={comment.user.username} />
                    {comment.text}
                  </Comment>
                ))}
                {/* 위에꺼는 데이터베이스 저장해서 들고오는용!! */}
                {selfComments.map((comment) => (
                  <Comment key={comment.id}>
                    <FatText text={comment.user.username} />
                    {comment.text}
                  </Comment>
                ))}
                {/* 위에꺼는 내가 당장쓴거 어레이에 저장해서 들고오는용!! */}
              </Comments>
            )}
            <Timestamp>{formatDate(createdAt)}</Timestamp>
            <Textarea
              placeholder={"Add a comment.."}
              value={newComment.value}
              onChange={newComment.onChange}
              onKeyPress={onKeyPress}
            />
          </Meta>
        </Post>
      ) : null}
    </>
  );
};
