import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { photoId }, { loggedInUser, client }) => {
  const photo = await client.photo.findUnique({
    where: {
      id: photoId,
    },
  });
  if (!photo) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  const likeWhere = {
    photoId_userId: {
      photoId,
      userId: loggedInUser.id,
    },
  };
  const like = await client.like.findUnique({ where: likeWhere });
  like
    ? await client.like.delete({ where: likeWhere })
    : await client.like.create({
        data: {
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          photo: {
            connect: {
              id: photo.id,
            },
          },
        },
      });
  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectResolver(resolverFn),
  },
};

export default resolvers;
