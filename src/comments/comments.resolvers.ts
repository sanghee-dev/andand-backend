import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Comment: {
    isMine: async ({ userId }, _, { loggedInUser }) =>
      userId === loggedInUser?.id,
  },
};

export default resolvers;
