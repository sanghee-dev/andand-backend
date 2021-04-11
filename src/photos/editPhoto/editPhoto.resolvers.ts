import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { id, caption }, { loggedInUser, client }) => {
  const photo = await client.photo.findFirst({
    where: {
      id,
      userId: loggedInUser.id,
    },
  });
  if (!photo) {
    return {
      ok: false,
      error: "Photo not found",
    };
  }
  await client.photo.update({
    where: {
      id,
    },
    data: {
      caption,
      hashtag: [],
    },
  });
  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectResolver(resolverFn),
  },
};

export default resolvers;
