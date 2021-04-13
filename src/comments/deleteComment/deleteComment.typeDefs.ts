import { gql } from "apollo-server-core";

export default gql`
  type deleteCommentResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteComment(commentId: Int!): deleteCommentResult!
  }
`;
