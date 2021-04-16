import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Room: {
    users: async ({ roomId }, _, { client }) =>
      await client.user.findMany({
        where: {
          rooms: {
            some: {
              id: roomId,
            },
          },
        },
      }),
    messages: async ({ roomId }, { page }, { client }) =>
      await client.message.findMany({
        where: {
          roomId,
        },
        orderBy: {
          createAt: "desc",
        },
        skip: (page - 1) * 5,
        take: 5,
      }),
    unreadTotal: async ({ roomId }, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return 0;
      }
      await client.message.count({
        where: {
          roomId,
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
};

export default resolvers;
