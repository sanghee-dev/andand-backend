import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    user: async ({ userId }, _, { client }) => {
      return client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
    hashtags: async ({ id }, _, { client }) => {
      return await client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
};

export default resolvers;
