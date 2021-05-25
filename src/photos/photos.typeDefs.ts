import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    userId: Int!
    file: String!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    comments: Int!
    isMine: Boolean!
    isLiked: Boolean!
  }
  type Hashtag {
    id: Int!
    createdAt: String!
    updatedAt: String!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
  }
`;
