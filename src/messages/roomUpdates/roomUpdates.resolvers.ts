import pubsub from "../../pubsub";
import { withFilter } from "apollo-server-express";
import { NEW_MESSAGE } from "../../constants";

const resolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        ({ roomUpdates }, { id }) => {
          return roomUpdates.roomId === id;
        }
      ),
    },
  },
};

export default resolvers;
