import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (_, { file, caption }, { loggedInUser, client }) => {
  let hashtagObj = [];
  if (caption) {
    const hashtags = caption.match(/#[\w]+/g);
    hashtagObj = hashtags.map((hashtag) => ({
      where: { hashtag },
      create: { hashtag },
    }));
  }
  return await client.photo.create({
    data: {
      file,
      caption,
      ...(hashtagObj.length > 0 && {
        hashtags: {
          connectOrCreate: hashtagObj,
        },
      }),
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
  // save the photo WITH the parsed hashtags
  // add the photo to the hashtags
};

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(resolverFn),
  },
};

export default resolvers;
