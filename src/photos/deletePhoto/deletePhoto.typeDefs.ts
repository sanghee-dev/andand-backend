import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deletePhoto(photoId: Int!): MutationResponse!
  }
`;
