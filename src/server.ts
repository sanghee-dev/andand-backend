require("dotenv").config();
import * as express from "express";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import client from "./client";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    };
  },
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
