import * as jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken["id"] },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export const protectResolver = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    const isMutation = info.operation.operation === "mutation";
    if (isMutation) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    } else {
      return null;
    }
  }
  return ourResolver(root, args, context, info);
};
