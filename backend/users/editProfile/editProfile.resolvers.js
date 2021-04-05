import client from "../../client";
import bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword },
  { loggedInUser, protectResolver }
) => {
  protectResolver(loggedInUser);
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
    },
  });
  if (updatedUser) {
    return { ok: true };
  } else {
    return { ok: false, error: "Could not update profile." };
  }
};

export default {
  Mutation: {
    editProfile: protectResolver(resolverFn),
  },
};
