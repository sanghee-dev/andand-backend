import { gql } from "apollo-server-core";

export default gql`
  type MutationResponse {
    ok: Boolean!
    error: String
  }

  type LoginResponse {
    ok: Boolean!
    error: String
    token: String
  }
`;
