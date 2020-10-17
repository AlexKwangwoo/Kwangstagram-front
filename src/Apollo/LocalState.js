export const defaults = {
  // 정의를함!
  isLoggedIn: Boolean(localStorage.getItem("token")) || false,
  // token을 체크하고 있으면 true로 할것임!
};

export const resolvers = {
  //함수를 만듬
  Mutation: {
    //누군가 로그인하도록 만들어야함
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      });
      return null;
    }, //전체 페이지를 reload하고 캐쉬를 리셋할것임!
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      window.location.reload();
      return null;
    },
  },
};
