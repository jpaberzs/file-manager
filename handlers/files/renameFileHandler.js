import { rename } from "node:fs/promises";
import { resolve } from "path";
import { getAccessStatus } from "../../utils/getAccessStatus.js";

import { styleText } from "node:util";

export const renameFileHandler = async (...args) => {
  try {
    const [pathToFile, newFileName] = args;

    if (!pathToFile || !newFileName)
      return console.error("Operation failed: Please check path to file or name of the new file");

    const currentDir = resolve(pathToFile);
    const isAccesed = await getAccessStatus(currentDir);

    if (!isAccesed) return console.error("Operation failed: Please check path directory");

    await rename(currentDir, newFileName)
      .then(() => process.stdout.write(styleText("green", "Operation succeeded \n")))
      .catch(() => process.stdout.write(styleText("red", "Operation failed \n")));

    return;
  } catch (error) {
    throw new Error(error);
  }
};
