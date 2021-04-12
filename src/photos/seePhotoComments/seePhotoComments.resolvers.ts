import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (_, { photoId, page }, { client }) =>
      client.comment.findMany({
        where: {
          photo: {
            id: photoId,
          },
        },
        orderBy: {
          createAt: "desc",
        },
        skip: (page - 1) * 5,
        take: 5,
      }),
  },
};

export default resolvers;
