import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowers: async (root) => {
      console.log(root.username);
      return 0;
    },
    totalFollowing: async (root) => {
      console.log(root.username);
      return 1;
    },
  },
};

export default resolvers;
