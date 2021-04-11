import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    user: async ({ userId }, _, { client }) =>
      await client.user.findUnique({
        where: {
          id: userId,
        },
      }),
    hashtags: async ({ id }, _, { client }) =>
      await client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
  Hashtag: {
    photos: async ({ id }, { page }, { client }) => {
      return await client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos({
          skip: (page - 1) * 5,
          take: 5,
        });
    },
    totalPhotos: async ({ id }, _, { client }) =>
      await client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

export default resolvers;
