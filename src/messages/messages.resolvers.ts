import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Room: {
    users: async ({ id }, _, { client }) =>
      await client.room.findFirst({ where: { id } }).users(),
    messages: async ({ id }, _, { client }) =>
      await client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return 0;
      }
      return await client.message.count({
        where: {
          roomId: id,
          read: false,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },
  Message: {
    user: async ({ userId }, _, { client }) =>
      await client.user.findUnique({
        where: {
          id: userId,
        },
      }),
  },
};

export default resolvers;
