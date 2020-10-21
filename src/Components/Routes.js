import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import BeforeLike from "../Routes/BeforeLike";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route path="/search" component={Search} />
    <Route path="/like" component={BeforeLike} />
    <Route path="/:username" component={Profile} />
    <Redirect from="*" to="/" />
    {/* 동작하는 라우터가 없으면 모든 주소에 대해 /로 보내준다!! */}
  </Switch> //username이 앞에있으면 /username이 항상 먼저오기때문에 맨뒤에 나둠!
); // 스위치는 딱하나의 라우터만 렌더링해준다!

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
