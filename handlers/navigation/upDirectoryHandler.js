import { join } from "path";
import { getAccessStatus } from "../../utils/getAccessStatus.js";

export const upDirectoryHandler = async () => {
  const currDir = process.cwd();
  const parentDir = join(currDir, "..");

  const isAccesed = await getAccessStatus(parentDir);

  try {
    if (isAccesed && currDir !== parentDir) {
      return process.chdir(parentDir);
    } else {
      console.log("Already at root, no change in directory.");
    }
    return;
  } catch (err) {
    throw new Error(err);
  }
};
