import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";

const resolverFn = async (
  _,
  { payload, userId, roomId },
  { loggedInUser, client }
) => {
  let room = null;
  // if userId, check if there is a user with userId
  if (userId) {
    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      return {
        ok: false,
        error: "User not found.",
      };
    } else {
      // if user, check if there is a room with userId and loggedInUser
      const existingRoom = await client.room.findMany({
        where: {
          users: {
            every: {
              OR: [{ id: userId }, { id: loggedInUser.id }],
            },
          },
        },
      });
      room = existingRoom[0];
      // if !room, create new room.
      if (!room) {
        room = await client.room.create({
          data: {
            users: {
              connect: [
                {
                  id: userId,
                },
                {
                  id: loggedInUser.id,
                },
              ],
            },
          },
        });
      }
    }
  }
  // if !room && roomId, find a room with roomId
  if (!room && roomId) {
    room = await client.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        id: true,
      },
    });
    if (!room) {
      return {
        ok: false,
        error: "Room not found.",
      };
    }
  }
  await client.message.create({
    data: {
      payload,
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      room: {
        connect: {
          id: room.id,
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
    sendMessage: protectResolver(resolverFn),
  },
};

export default resolvers;
