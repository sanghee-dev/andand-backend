import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, { messageId }, { loggedInUser, client }) => {
  const message = await client.message.findFirst({
    where: {
      id: messageId,
      userId: {
        not: loggedInUser.id,
      },
      room: {
        users: {
          some: {
            id: loggedInUser.id,
          },
        },
      },
    },
    select: {
      id: messageId,
    },
  });
  if (!message) {
    return {
      ok: false,
      error: "Message not found.",
    };
  }
  await client.message.update({
    where: {
      id: messageId,
    },
    data: {
      read: true,
    },
  });
  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    readMessage: protectResolver(resolverFn),
  },
};

export default resolvers;
