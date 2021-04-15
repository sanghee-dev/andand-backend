import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    createAt: String!
    updatedAt: String!
    payload: String!
    user: User!
    room: Room!
  }
  type Room {
    id: Int!
    createAt: String!
    updatedAt: String!
    users: [User]!
    messages: [Message]!
  }
`;
