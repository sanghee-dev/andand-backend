import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editComment(commentId: Int!, payload: String!): MutationResponse!
  }
`;
