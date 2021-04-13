import { gql } from "apollo-server-core";

export default gql`
  type editCommentResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editComment(commentId: Int!, payload: String!): editCommentResult!
  }
`;
