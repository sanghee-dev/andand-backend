import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { username }, { client }) => {
      return client.user.findUnique({
        where: { username },
        include: {
          followers: true,
          following: true,
        },
      });
    },
  },
};

export default resolvers;
