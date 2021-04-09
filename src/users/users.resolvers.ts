import { Resolvers } from "../types";
import client from "../client";

const resolvers: Resolvers = {
  User: {
    totalFollowers: async ({ id }) =>
      await client.user.count({ where: { following: { some: { id } } } }),
    totalFollowing: async ({ id }) =>
      await client.user.count({ where: { followers: { some: { id } } } }),
  },
};

export default resolvers;
