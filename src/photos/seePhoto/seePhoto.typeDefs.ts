import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePhoto(photoId: Int!): Photo
  }
`;
