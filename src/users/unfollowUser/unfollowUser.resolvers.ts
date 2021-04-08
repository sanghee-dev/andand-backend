import { protectResolver } from "../users.utils";
import { Resolvers } from "../../types";
import client from "../../client";

const resolverFn = async (_, { username }, { loggedInUser }) => {
  try {
    const ok = await client.user.findUnique({
      where: {
        username,
      },
    });
    if (!ok) {
      return {
        ok: false,
        error: "That user does not exist.",
      };
    }
    await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        following: {
          disconnect: {
            username,
          },
        },
      },
    });
    return {
      ok: true,
    };
  } catch (e) {
    return {
      ok: false,
      eror: "Cannot unfollow user.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectResolver(resolverFn),
  },
};

export default resolvers;
