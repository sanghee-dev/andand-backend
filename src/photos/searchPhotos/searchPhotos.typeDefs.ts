import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchPhotos(keyword: String!, page: Int!): [Photo]
  }
`;
