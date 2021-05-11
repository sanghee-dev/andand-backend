import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: Int!
    createdAt: String!
    updatedAt: String!
    photo: Photo!
    user: User!
    payload: String!
    isMine: Boolean!
  }
`;
