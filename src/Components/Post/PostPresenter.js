import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment } from "../Icons";

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
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

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
}) => {
  const a = files.map((file, index) => file.url);
  console.log(a);
  return (
    <Post>
      <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
          <FatText text={username} />
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
        <Buttons>
          <Button>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
          <Button>
            <Comment />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
        <Timestamp>{createdAt}</Timestamp>
        <Textarea placeholder={"Add a comment.."} {...newComment} />
      </Meta>
    </Post>
  );
};
