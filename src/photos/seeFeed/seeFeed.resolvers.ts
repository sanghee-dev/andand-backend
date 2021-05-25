import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, { page, lastId }, { loggedInUser, client }) =>
  await client.photo.findMany({
    where: {
      OR: [
        {
          user: {
            followers: {
              some: {
                id: loggedInUser.id,
              },
            },
          },
        },
        {
          userId: loggedInUser.id,
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: lastId ? 1 : 0,
    take: 5,
    ...(lastId && { cursor: { id: lastId } }),
  });

const resolvers: Resolvers = {
  Query: {
    seeFeed: protectResolver(resolverFn),
  },
};

export default resolvers;
