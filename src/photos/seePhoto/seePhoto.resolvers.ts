import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhoto: async (_, { id }, { client }) =>
      client.photo.findUnique({
        where: {
          id,
        },
      }),
  },
};

export default resolvers;
