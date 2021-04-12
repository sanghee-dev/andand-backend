import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const resolverFn = async (_, { id }, { loggedInUser, client }) => {
  const photo = await client.photo.findUnique({
    where: {
      id,
    },
  });
  if (!photo) {
    return {
      ok: false,
      error: "Photo not found.",
    };
  }
  console.log(photo);
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
