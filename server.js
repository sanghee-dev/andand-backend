import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    year: Int
    genre: String
    createAt: String
    updateAt: String
  }
  type Query {
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): String
    deleteMovie(id: Int!): String
  }
`;

const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ id: 0, title: "hello", year: 2021 }),
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) => "",
    deleteMovie: (_, { id }) => "",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
