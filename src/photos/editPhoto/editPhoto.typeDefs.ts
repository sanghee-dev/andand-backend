import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editPhoto(id: Int!, caption: String!): MutationResponse!
  }
`;
