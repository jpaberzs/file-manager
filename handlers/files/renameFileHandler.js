import { access, rename } from "node:fs/promises";
import { resolve } from "path";

import { styleText } from "node:util";

export const renameFileHandler = async (...args) => {
  try {
    const [pathToFile, newFileName] = args;

    const currentDir = resolve(pathToFile);
    const isAccesed = await access(currentDir)
      .then(() => true)
      .catch(() => false);

    if (!isAccesed) return console.error("Operation failed: Please check path directory");

    await rename(currentDir, newFileName)
      .then(() => process.stdout.write(styleText("green", "Operation succeeded \n")))
      .catch(() => process.stdout.write(styleText("red", "Operation failed \n")));

    return;
  } catch (error) {
    throw new Error(error);
  }
};
