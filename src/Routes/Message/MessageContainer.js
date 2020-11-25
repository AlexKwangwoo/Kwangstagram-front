import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import React from "react";
import MessagePresenter from "./MessagePresenter";

const GET_ROOMS = gql`
  query seeRooms {
    seeRooms {
      id
      participants {
        id
        avatar
        username
      }
      messages {
        text
        createdAt
        from {
          username
        }
      }
      createdAt
    }
  }
`;

// eslint-disable-next-line
export default () => {
  const { data, loading } = useQuery(GET_ROOMS);
  return (
    <>
      {!loading && data.seeRooms && (
        <MessagePresenter loading={loading} seeRooms={data.seeRooms} />
      )}
    </>
  );
};
