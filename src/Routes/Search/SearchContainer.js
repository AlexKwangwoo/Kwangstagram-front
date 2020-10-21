import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "@apollo/react-hooks";
import { SEARCH } from "./SearchQueries";

//You can get access to the history object's properties
//and the closest <Route> 's match via the withRouter
// higher-order component.
export default withRouter(({ location: { search } }) => {
  //location안에 ?term=hello 있음!
  const term = search.split("=")[1];
  //?term=hello 에서 = 빼고 hello를 가져온다!
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined, //skip이 true이면 그냥 넘어간다!
    variables: {
      term,
    },
  });
  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});
