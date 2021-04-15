import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, __, { loggedInUser, client }) =>
  await client.room.findMany({
    where: {
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

const resolvers: Resolvers = {
  Query: {
    seeRooms: protectResolver(resolverFn),
  },
};

export default resolvers;
