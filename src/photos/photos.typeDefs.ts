import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    createAt: String!
    updatedAt: String!
    user: User!
    userId: Int!
    file: String!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
  }
  type Hashtag {
    id: Int!
    createAt: String!
    updatedAt: String!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
  }
  type Like {
    id: Int!
    createAt: String!
    updatedAt: String!
    photo: Photo!
  }
`;
