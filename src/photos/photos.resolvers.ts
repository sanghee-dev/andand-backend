import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    user: async ({ id }, _, { client }) =>
      await client.user.findUnique({
        where: {
          id,
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
    likes: async ({ id }, _, { client }) =>
      await client.like.count({
        where: {
          photoId: id,
        },
      }),
    comments: async ({ id }, _, { client }) =>
      await client.comment.count({
        where: {
          photoId: id,
        },
      }),
    isMine: async ({ id }, _, { loggedInUser }) => id === loggedInUser?.id,
    isLiked: async ({ id }, _, { client, loggedInUser }) => {
      if (!loggedInUser) return false;
      const ok = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) return true;
      return false;
    },
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
