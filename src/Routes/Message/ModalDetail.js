import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { toast } from "react-toastify";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import { ButtonVerySmall } from "../../Components/Button";
import Input from "../../Components/Input";
import useInput from "../../Hooks/useInput";
import { ADD_MESSAGE, NEW_MESSAGE } from "./MessageQueries";

const Div = styled.div`
  height: 40px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 15px;
  font-weight: 600;
  padding-right: 10px;
`;

const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 110px;
  border-bottom: 1px solid #e6e6e6;
  padding-right: 10px;
  padding-left: 10px;
  font-weight: 600;
  text-align: center;
`;

const Div3 = styled.div`
  height: 390px;
  padding-bottom: 13px;
`;

const VeryTopText = styled.p`
  margin-right: 25%;
`;

const ToInput = styled(Input)`
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
  background-color: none;
  border: none;
`;

const MessageSend = styled(Input)`
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
  background-color: none;
  border: none;
`;

const TopText = styled.div`
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const FollowerList = styled.div`
  height: 100%;
`;

const FollowerBox = styled.button`
  padding: 10px;
  padding-left: 10px;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  &: hover {
    outline: 0;
    background-color: #fafafa;
  }
  &: focus {
    outline: 0;
    background-color: #efefef;
  }

  border: none;
  background-color: #ffffff;
`;

const FollowerInfo = styled.div`
  padding-left: 10px;
`;
const FollowerName = styled.div`
  margin-bottom: 2px;
  font-weight: 600;
`;
const FollowerNameDown = styled.div`
  color: #aaaac0;
`;

const Div2Top = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const ToText = styled.div``;

const Div2Down = styled.div`
  display: flex;
  align-items: center;
`;
const MessageText = styled.div``;

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
export default ({ me, seeRooms }) => {
  const [nameClick, setNameClick] = useState("");
  const [selectedPersonInfo, setSelectedPersonInfo] = useState(null);
  const [personId, setPersonId] = useState(null);
  const [messageRoomId, setMessageRoomId] = useState(null);
  const toName = useInput(nameClick);
  const newMessage = useInput(null);
  const [addNewMessageMutation] = useMutation(NEW_MESSAGE, {
    variables: {
      message: newMessage.value,
      toId: personId,
    },
  });

  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    variables: {
      roomId: messageRoomId,
      message: newMessage.value,
      toId: personId,
    },
  });

  const send = async () => {
    const roomCheck = seeRooms.filter(
      (room) => room.participants[1].id === personId
    )[0];
    console.log("잠온다");
    console.log(roomCheck);

    if (roomCheck) {
      console.log("방있음!!");
      console.log(roomCheck.id);

      console.log(messageRoomId);

      await addMessageMutation();
      window.location.reload();
    } else {
      console.log("방없음");
      if (personId && newMessage.value != null) {
        await addNewMessageMutation();
        window.location.reload();
      } else {
        toast.error("Please choose a user and type the message");
      }
    }
  };

  const selectName = (following) => {
    // console.log("이름은?!??!");
    // console.log(name);
    setSelectedPersonInfo(following);
    setPersonId(following.id);
    setNameClick(following.username);

    console.log(selectedPersonInfo);
  };

  useEffect(() => {
    const roomCheck = seeRooms.filter(
      (room) => room.participants[1].id === personId
    )[0];
    if (roomCheck) {
      setMessageRoomId(roomCheck.id);
    }
  }, [personId, seeRooms]);

  return (
    <>
      <Div>
        <VeryTopText>New Message</VeryTopText>
        <ButtonVerySmall text="Send" onClick={send} />
      </Div>
      <Div2>
        <Div2Top>
          <ToText>To:</ToText>

          <ToInput
            placeholder="Choose User Name  💕"
            onChange={toName.onChange}
            value={nameClick}
            disabled={true}
          />
        </Div2Top>
        <Div2Down>
          <MessageText>Message:</MessageText>
          <MessageSend
            placeholder="Type The Message..."
            value={newMessage.value}
            onChange={newMessage.onChange}
          />
        </Div2Down>
      </Div2>
      <Div3>
        <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
          <TopText Text>Your Friend</TopText>
          <FollowerList>
            {me.following.map((following) => (
              <FollowerBox
                key={following.id}
                onClick={() => selectName(following)}
              >
                <Avatar size="smmd" url={following.avatar} />
                <FollowerInfo>
                  <FollowerName>{following.username}</FollowerName>
                  <FollowerNameDown>
                    {following.firstName}
                    {following.lastName}
                  </FollowerNameDown>
                </FollowerInfo>
              </FollowerBox>
            ))}
          </FollowerList>
        </CustomScrollbars>
      </Div3>
    </>
  );
};
