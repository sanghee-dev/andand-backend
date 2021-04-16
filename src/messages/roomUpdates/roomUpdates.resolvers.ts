import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constants";

const resolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
    },
  },
};

export default resolvers;
