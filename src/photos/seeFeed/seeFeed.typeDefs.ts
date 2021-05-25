import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeFeed(lastId: Int): [Photo]
  }
`;
