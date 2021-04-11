import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhotos: async (_, { keyword, page }, { client }) =>
      client.photo.findMany({
        skip: (page - 1) * 5,
        take: 5,
        where: {
          caption: {
            contains: keyword,
          },
        },
      }),
  },
};

export default resolvers;
