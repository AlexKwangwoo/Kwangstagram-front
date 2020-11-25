import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import TextareaAutosize from "react-autosize-textarea/lib";
import { toast } from "react-toastify";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import { ButtonSmall } from "../../Components/Button";
import { Write, MessageBig } from "../../Components/Icons";
import useInput from "../../Hooks/useInput";
import { formatDate } from "../../utils";
import { ADD_MESSAGE } from "./MessageQueries";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "react-awesome-modal";
import ModalDetail from "./ModalDetail";
import { ME } from "../../SharedQueries";

const Wrapper = styled.div`
  min-height: 80vh;
  background-color: #ffffff;
  margin-top: -20px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  display: flex;
`;

const Left = styled.div`
  border-right: 1px solid #e6e6e6;
  width: 40%;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  width: 60%;
`;

const Username = styled.div`
  font-size: 20px;
  border-bottom: 1px solid #e6e6e6;
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  font-weight: 600;
`;

const List = styled.div`
  height: 90%;
  width: 100%;
`;

const UserBox = styled.button`
  width: 100%;
  display: inline-block;
  height: 70px;
  display: flex;
  border: none;
  justfy-contents: center;
  align-items: center;
  padding-left: 20px;
  background-color: #ffffff;
  &: hover {
    outline: 0;
    background-color: #fafafa;
  }
  &: focus {
    outline: 0;
    background-color: #efefef;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const UserInfoName = styled.div`
  text-align: left;
  margin-bottom: 4px;
`;

const StateText = styled.div`
  color: #aaaac0;
`;

const SendMessage = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.div`
  padding-left: 14px;
  border: 3px solid black;
  width: 100px;
  height: 100px;
  border-radius: 80px;
  display: flex;
  justfy-contents: center;
  align-items: center;
`;

const TextFirst = styled.div`
  margin-top: 30px;
  font-size: 20px;
`;

const TextSecond = styled.div`
  margin-top: 10px;
  color: #aaaac0;
  margin-bottom: 30px;
`;

const ChatUser = styled.div`
  height: 10%;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const Chat = styled.div`
  height: 80%;
  padding-left: 20px;
  padding-top: 20px;
`;

const RightName = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left: 15px;
`;

const TextRight = styled.div`
  text-align: right;
  padding: 20px;
  background-color: #efefef;
  border-radius: 20px;
  margin-right: 10px;
`;

const TextLeft = styled.div`
  border: 2px solid #f7f7f7;
  padding: 20px;
  border-radius: 20px;
  margin-left: 10px;
`;

const ChatInfo = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const ChatInfoRight = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const ChatOutBoxLeft = styled.div`
  margin-bottom: 10px;
`;

const ChatOutBoxRight = styled.div`
  margin-bottom: 10px;
  margin-right: 20px;
`;

const DateLeft = styled.div`
  font-size: 10px;
  color: #aaaac0;
`;

const DateRight = styled.div`
  text-align: right;
  font-size: 10px;
  color: #aaaac0;
`;

const SendMessageTo = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled(TextareaAutosize)`
  height: 60%;
  width: 80%;
  font-size: 15px;
  border: 1px solid #e6e6e6;
  border-radius: 30px;
  padding: 13px 30px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
    font-size: 15px;
  }
`;

const IconWrite = styled.div`
  margin-left: 10px;
  margin-top: 2px;
  &:hover {
    cursor: pointer;
  }
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
export default ({ seeRooms }) => {
  const { data, loading } = useQuery(ME);
  // console.log(data);
  // const { seeRooms } = data;
  const [roomNumber, setRoomNumber] = useState(null);
  const [roomNumId, setRoomNumId] = useState(null);
  const [toPerson, setToPerson] = useState(null);
  const [selfMessages, setSelfMessages] = useState([]);
  const newMessage = useInput("");

  const [visible, setVisible] = useState(false);
  const openModal = () => {
    console.log(visible);
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  // console.log(seeRooms);
  // const a = [seeRooms];
  // console.log(a.length);

  const onClick = (id) => {
    const selectedRoom = seeRooms.filter((room) => room.id === id)[0];
    console.log(selectedRoom.participants[1].id);
    setRoomNumber(selectedRoom);
    setToPerson(selectedRoom.participants[1].id);
    setRoomNumId(selectedRoom.id);
  };

  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    variables: {
      roomId: roomNumId,
      message: newMessage.value,
      toId: toPerson,
    },
  });

  const custom = { overlay: { zIndex: 999 } };

  const onKeyPress = async (event) => {
    const { which } = event;
    if (which === 13) {
      event.preventDefault();
      //13은 keycode로 엔터인데.. 엔터지면 이벤트 멈춤!
      try {
        console.log("1단계");
        console.log(newMessage.value);
        const {
          data: { sendMessage },
        } = await addMessageMutation();
        // 일단 데이터베이스에 저장할 것이다!
        setSelfMessages([...selfMessages, sendMessage]);
        console.log("2단계");
        console.log(selfMessages);
        newMessage.setValue("");
      } catch {
        toast.error("Cant send message");
      }
    }
  };

  return (
    <Wrapper>
      <Left>
        <Username>
          <Name>KwangwooBack</Name>
          <IconWrite onClick={openModal}>
            <Write />
          </IconWrite>
        </Username>
        <List>
          {seeRooms &&
            seeRooms.map((room) => (
              <UserBox key={room.id} onClick={() => onClick(room.id)}>
                <Avatar size="md" url={room.participants[1].avatar} />
                <UserInfo>
                  <UserInfoName>{room.participants[1].username}</UserInfoName>
                  <StateText>
                    Messaged · {formatDate(room.messages[0].createdAt)}
                  </StateText>
                </UserInfo>
              </UserBox>
            ))}
        </List>
      </Left>
      <Right>
        {roomNumber ? (
          <>
            <ChatUser>
              <Avatar size="smmd" url={roomNumber.participants[1].avatar} />
              <RightName>{roomNumber.participants[1].username}</RightName>
            </ChatUser>
            <Chat>
              <CustomScrollbars
                autoHide
                autoHideTimeout={500}
                autoHideDuration={200}
              >
                {roomNumber.messages.map((message) =>
                  message.from.username ===
                  roomNumber.participants[0].username ? (
                    <ChatOutBoxRight>
                      <ChatInfoRight>
                        <Avatar
                          size="sm"
                          url={roomNumber.participants[0].avatar}
                        />
                        <TextRight key={message.createdAt}>
                          {message.text}
                        </TextRight>
                      </ChatInfoRight>
                      <DateRight>{formatDate(message.createdAt)}</DateRight>
                    </ChatOutBoxRight>
                  ) : (
                    <ChatOutBoxLeft>
                      <ChatInfo>
                        <Avatar
                          size="sm"
                          url={roomNumber.participants[1].avatar}
                        />
                        <TextLeft key={message.createdAt}>
                          {message.text}
                        </TextLeft>
                      </ChatInfo>
                      <DateLeft>{formatDate(message.createdAt)}</DateLeft>
                    </ChatOutBoxLeft>
                  )
                )}
                {selfMessages.map((messageText) =>
                  roomNumber.id === messageText.room.id ? (
                    <ChatOutBoxRight>
                      <ChatInfoRight>
                        <Avatar
                          size="sm"
                          url={roomNumber.participants[0].avatar}
                        />
                        <TextRight key={messageText.id}>
                          {messageText.text}
                        </TextRight>
                      </ChatInfoRight>
                      <DateRight>{formatDate(messageText.createdAt)}</DateRight>
                    </ChatOutBoxRight>
                  ) : null
                )}
              </CustomScrollbars>
            </Chat>
            <SendMessageTo>
              <InputBox
                placeholder="Message..."
                value={newMessage.value}
                onChange={newMessage.onChange}
                onKeyPress={onKeyPress}
              />
            </SendMessageTo>
          </>
        ) : (
          <SendMessage>
            <IconBox>
              <MessageBig />
            </IconBox>
            <TextFirst>Your Messages</TextFirst>
            <TextSecond>Send private messages to a friend</TextSecond>
            <ButtonSmall text="Send Message" onClick={openModal} />
            <Modal
              style={custom}
              visible={visible}
              width="400"
              height="540"
              effect="fadeInUp"
              onClickAway={() => closeModal()}
            >
              {!loading && data && data.me && (
                <ModalDetail me={data.me} seeRooms={seeRooms} />
              )}
            </Modal>
          </SendMessage>
        )}
      </Right>
    </Wrapper>
  );
};
