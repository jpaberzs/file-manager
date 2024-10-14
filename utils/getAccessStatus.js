import { access } from "node:fs/promises";

export const getAccessStatus = async (path) => {
  if (!path) {
    console.log("No path provided");
    return null;
  }

  return await access(path)
    .then(() => true)
    .catch(() => false);
};
