import * as bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword },
  { loggedInUser, client }
) => {
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      ...(uglyPassword && { password: uglyPassword }),
      bio: "",
    },
  });
  if (updatedUser) {
    return { ok: true };
  } else {
    return { ok: false, error: "Could not update profile." };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};

export default resolvers;
