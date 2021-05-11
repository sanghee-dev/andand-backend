import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, __, { loggedInUser, client }) =>
  client.user.findUnique({
    where: {
      id: loggedInUser.id,
    },
  });

const resolvers: Resolvers = {
  Query: {
    me: protectResolver(resolverFn),
  },
};

export default resolvers;
