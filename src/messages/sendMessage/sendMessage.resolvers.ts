import { protectResolver } from "../../users/users.utils";
import { Resolvers } from "../../types";
import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constants";

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
      // if !room, create new room and check loggedInUser.
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
    room = await client.room.findFirst({
      where: {
        id: roomId,
        users: {
          some: {
            id: loggedInUser.id,
          },
        },
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
  // create message
  const message = await client.message.create({
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
  // publish message
  pubsub.publish(NEW_MESSAGE, {
    roomUpdates: { ...message },
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
