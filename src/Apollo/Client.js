import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  // 아폴로부스터를 이용해 client를 만들고
  // 이를 통해 프론트앤드에서 백앤드 가동함
  uri: "http://localhost:5000",
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
