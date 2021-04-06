import * as bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import { Resolvers } from "../../types";
import { createWriteStream } from "fs";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser, client }
) => {
  const { filename, createReadStream } = await avatar;
  const readStream = createReadStream();
  const whiteStream = createWriteStream(process.cwd() + "/uploads/" + filename);
  readStream.pipe(whiteStream);

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
      avatar: "avatar",
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
