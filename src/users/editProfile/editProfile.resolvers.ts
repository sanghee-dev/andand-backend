import * as bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import { Resolvers } from "../../types";
import { uploadPhoto } from "../../shared/shared.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser, client }
) => {
  let avatarUrl = null;
  if (avatar) {
    avatarUrl = await uploadPhoto(avatar, loggedInUser.id);
  }
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
      bio,
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });
  if (updatedUser.id) {
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
