import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { id, payload }, { loggedInUser, client }) => {
  const ok = await client.photo.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
  if (!ok) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  await client.comment.create({
    data: {
      payload,
      photo: {
        connect: {
          id,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
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
    createComment: protectResolver(resolverFn),
  },
};

export default resolvers;
