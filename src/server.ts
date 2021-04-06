require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import client from "./client";
import { getUser, protectResolver } from "./users/users.utils";

const PORT = process.env.PORT;
const server = new ApolloServer({
  schema,
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
