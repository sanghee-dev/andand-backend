import { gql } from "apollo-server-core";

export default gql`
  type deletePhotoResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deletePhoto(photoId: Int!): deletePhotoResult!
  }
`;
