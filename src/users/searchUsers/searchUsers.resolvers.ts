import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword, lastId }, { client }) => {
      try {
        const users = await client.user.findMany({
          where: {
            username: {
              contains: keyword.toLowerCase(),
            },
          },
          skip: lastId ? 1 : 0,
          take: 5,
          ...(lastId && { cursor: { id: lastId } }),
        });
        const totalUsers = await client.user.count({
          where: {
            username: {
              contains: keyword.toLowerCase(),
            },
          },
        });
        return {
          ok: true,
          users,
          totalPages: Math.ceil(totalUsers / 5),
        };
      } catch (e) {
        return {
          ok: false,
          error: "Cannot search users",
        };
      }
    },
  },
};

export default resolvers;
