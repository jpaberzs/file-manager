import { access } from "node:fs/promises";
import { resolve } from "path";

export const dedicateFolderHandler = async (arg) => {
  try {
    const destination = await resolve(arg);

    const isAccesed = await access(destination)
      .then(() => true)
      .catch(() => false);

    if (isAccesed) return process.chdir(destination);

    console.error("Operation failed: Please check path directory");
    return;
  } catch (error) {
    throw new Error(error);
  }
};
