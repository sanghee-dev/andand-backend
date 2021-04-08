import { Resolvers } from "../../types";
import client from "../../client";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      try {
        const followers = await client.user
          .findUnique({ where: { username } })
          .followers({
            skip: (page - 1) * 5,
            take: 5,
          });
        return {
          ok: true,
          followers,
        };
      } catch (e) {
        return {
          ok: false,
          eror: "Cannot follow user.",
        };
      }
    },
  },
};

export default resolvers;
