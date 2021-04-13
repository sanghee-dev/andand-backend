import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): MutationResponse!
  }
`;
