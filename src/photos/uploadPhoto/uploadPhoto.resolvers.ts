import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";
import { processHashtags } from "../photos.utils";

const resolverFn = async (_, { file, caption }, { loggedInUser, client }) =>
  await client.photo.create({
    data: {
      file,
      caption,
      hashtags: {
        connectOrCreate: processHashtags(caption),
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(resolverFn),
  },
};

export default resolvers;
