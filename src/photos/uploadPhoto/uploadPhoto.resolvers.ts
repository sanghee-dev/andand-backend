import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, { file, caption }, { loggedInUser, client }) => {
  if (caption) {
    // parse caption
    // get or create hashtags
  }
  // save the photo WITH the parsed hashtags
  // add the photo to the hashtags
  return true;
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};

export default resolvers;
