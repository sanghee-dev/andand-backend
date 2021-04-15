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
    unreadTotal: async () => await 0,
  },
};

export default resolvers;
