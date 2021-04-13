import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (
  _,
  { commentId, payload },
  { loggedInUser, client }
) => {
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
    await client.comment.update({
      where: {
        id: commentId,
      },
      data: {
        payload,
      },
    });
    return {
      ok: true,
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectResolver(resolverFn),
  },
};

export default resolvers;
