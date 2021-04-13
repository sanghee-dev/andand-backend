import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { commentId }, { loggedInUser, client }) => {
  const comment = await client.comment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      userId: true,
    },
  });
  if (!comment) {
    return {
      ok: false,
      error: "Comment not found.",
    };
  } else if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  } else {
    await client.comment.delete({
      where: {
        id: commentId,
      },
    });
    return {
      ok: true,
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectResolver(resolverFn),
  },
};

export default resolvers;
