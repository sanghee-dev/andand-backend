import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    sendMessage(payload: String!, userId: Int, roomId: Int): MutationResponse!
  }
`;
