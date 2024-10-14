import { resolve } from "path";
import { getAccessStatus } from "../../utils/getAccessStatus.js";

export const dedicateFolderHandler = async (arg) => {
  try {
    const destination = resolve(arg);
    console.log(destination);

    const isAccesed = await getAccessStatus(destination);

    if (isAccesed) return process.chdir(destination);

    console.error("Operation failed: Please check path directory");
    return;
  } catch (error) {
    throw new Error(error);
  }
};
