import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    createAt: String!
    updatedAt: String!
    payload: String!
    user: User!
    room: Room!
    read: Boolean!
  }
  type Room {
    id: Int!
    createAt: String!
    updatedAt: String!
    users: [User]!
    messages: [Message]!
    unreadTotal: Int!
  }
`;
