import pubsub from "../../pubsub";
import { Resolvers } from "../../types";
import { NEW_MESSAGE } from "../../constants";

const resolverFn = () => {
  subscribe: () => pubsub.asyncIterator(NEW_MESSAGE);
};

const resolvers: Resolvers = {
  Subscription: {
    roomUpdates: resolverFn,
  },
};

export default resolvers;
