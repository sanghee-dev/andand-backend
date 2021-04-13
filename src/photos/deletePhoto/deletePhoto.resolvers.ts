import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { photoId }, { loggedInUser, client }) => {
  const photo = await client.photo.findUnique({
    where: {
      id: photoId,
    },
    select: {
      userId: true,
    },
  });
  if (!photo) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  } else if (photo.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  } else {
    await client.photo.delete({
      where: {
        id: photoId,
      },
    });
    return {
      ok: true,
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectResolver(resolverFn),
  },
};

export default resolvers;
