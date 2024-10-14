import { writeFile } from "node:fs/promises";

import { resolve } from "path";
import { styleText } from "node:util";
import { getAccessStatus } from "../../utils/getAccessStatus.js";

export const addFileHandler = async (arg) => {
  try {
    const currentDir = resolve(`${process.cwd()}/${arg}`);
    const isAccesed = getAccessStatus(currentDir);

    if (isAccesed) return console.error("Operation failed: This file is already exist!");

    await writeFile(currentDir, "")
      .then(() => process.stdout.write(styleText("green", "Operation succeeded \n")))
      .catch(() => process.stdout.write(styleText("red", "Operation failed \n")));

    return;
  } catch (error) {
    throw new Error(error);
  }
};
