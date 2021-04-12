import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    createdAt: String!
    updatedAt: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: String
    followers: [User]
    following: [User]
    totalFollowers: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    photos: [Photo]
  }
`;
