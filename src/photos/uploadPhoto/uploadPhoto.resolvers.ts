import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, { file, caption }, { loggedInUser, client }) => {
  if (caption) {
    const hashtags = caption.match(/#[\w]+/g);
  }
  client.photo.create({
    data: {
      file,
      caption,
      hashtags: {
        connectOrCreate: [
          {
            where: {
              hashtags: "#food",
            },
            create: {
              hashtags: "#food",
            },
          },
        ],
      },
    },
  });

  // save the photo WITH the parsed hashtags
  // add the photo to the hashtags
  return true;
};

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(resolverFn),
  },
};

export default resolvers;
