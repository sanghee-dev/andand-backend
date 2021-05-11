import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (_, { id, page }, { client }) =>
      client.comment.findMany({
        where: {
          photo: {
            id,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * 5,
        take: 5,
      }),
  },
};

export default resolvers;
