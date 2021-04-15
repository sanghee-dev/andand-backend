import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeRoom(roomId: Int!): Room
  }
`;
