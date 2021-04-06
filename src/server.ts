require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import client from "./client";
import { getUser, protectResolver } from "./users/users.utils";

const PORT = process.env.PORT;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
      client,
    };
  },
});
server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
