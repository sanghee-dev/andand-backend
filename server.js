require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./backend/schema";

const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE3NjI3NjczLCJleHAiOjE2NDkxNjM2NzN9.cDYgStehtOtMQS-IwdRiNPtACXJpgU2ni36O0Bryyu4",
  },
});

const PORT = process.env.PORT;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
