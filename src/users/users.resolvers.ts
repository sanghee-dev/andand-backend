import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowers: async ({ id }, _, { client }) =>
      await client.user.count({ where: { following: { some: { id } } } }),
    totalFollowing: async ({ id }, _, { client }) =>
      await client.user.count({ where: { followers: { some: { id } } } }),
    isMe: async ({ id }, _, { loggedInUser }) => {
      return id === loggedInUser?.id;
    },
  },
};

export default resolvers;
