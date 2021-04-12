import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePhotoComments(photoId: Int!, page: Int!): [Comment]
  }
`;
