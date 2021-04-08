import { protectResolver } from "../users.utils";
import { Resolvers } from "../../types";
import client from "../../client";

const resolverFn = async (_, { username }, { loggedInUser }) => {
  try {
    const ok = await client.user.findUnique({
      where: {
        username,
      },
      select: { id: true },
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
          connect: {
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
      eror: "Cannot follow user.",
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectResolver(resolverFn),
  },
};

export default resolvers;
