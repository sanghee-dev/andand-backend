import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, { id }, { loggedInUser, client }) =>
  await client.room.findFirst({
    where: {
      id,
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
