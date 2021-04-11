import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    user: User!
    userId: Int!
    file: String!
    caption: String
    hashtags: [Hashtag]
    createAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos: [Photo]
    createAt: String!
    updatedAt: String!
  }
`;
