import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { username, lastId }, { client }) => {
      try {
        const ok = await client.user.findUnique({
          where: { username },
          select: { id: true },
        });
        if (!ok) {
          return {
            ok: false,
            error: "User not found.",
          };
        }
        const following = await client.user
          .findUnique({ where: { username } })
          .following({
            skip: lastId ? 1 : 0,
            take: 5,
            ...(lastId && { cursor: { id: lastId } }),
          });
        const totalFollowing = await client.user.count({
          where: {
            followers: { some: { username } },
          },
        });
        return {
          ok: true,
          following,
          totalPages: Math.ceil(totalFollowing / 5),
        };
      } catch (e) {
        return {
          ok: false,
          eror: "Cannot find following.",
        };
      }
    },
  },
};

export default resolvers;
