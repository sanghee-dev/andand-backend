import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, { roomId }, { loggedInUser, client }) =>
  await client.room.findFirst({
    where: {
      id: roomId,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

const resolvers: Resolvers = {
  Query: {
    seeRoom: protectResolver(resolverFn),
  },
};

export default resolvers;
