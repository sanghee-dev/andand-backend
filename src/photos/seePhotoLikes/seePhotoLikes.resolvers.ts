import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (_, { id, page }, { client }) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
        skip: (page - 1) * 5,
        take: 5,
      });
      return likes.map((like) => like.user);
    },
  },
};

export default resolvers;
