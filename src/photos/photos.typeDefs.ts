import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    createAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: String!
    hashtag: String!
    photos: [Photo]
    createAt: String!
    updatedAt: String!
  }
`;
