import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";
import { processHashtags } from "../photos.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFn = async (_, { file, caption }, { loggedInUser, client }) => {
  const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
  return await client.photo.create({
    data: {
      file: fileUrl,
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
};

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectResolver(resolverFn),
  },
};

export default resolvers;
