import { join } from "path";
import { access } from "node:fs/promises";

export const upDirectoryHandler = async () => {
  const currDir = process.cwd();
  const parentDir = join(currDir, "..");

  const isAccesed = await access(parentDir)
    .then(() => true)
    .catch(() => false);

  try {
    if (isAccesed && currDir !== parentDir) {
      return process.chdir(parentDir);
    } else {
      console.log("Already at root, no change in directory.");
    }
  } catch (err) {
    throw new Error(err);
  }
};
