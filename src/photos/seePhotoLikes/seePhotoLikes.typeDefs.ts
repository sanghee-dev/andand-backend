import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePhotoLikes(photoId: Int!, page: Int!): [User]
  }
`;
