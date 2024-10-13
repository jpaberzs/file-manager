import { access, writeFile } from "node:fs/promises";

import { resolve } from "path";
import { styleText } from "node:util";

export const addFileHandler = async (...arg) => {
  try {
    const currentDir = resolve(`${process.cwd()}/${arg.join(" ")}`);
    const isAccesed = await access(currentDir)
      .then(() => true)
      .catch(() => false);

    if (isAccesed) return console.error("Operation failed: This file is already exist!");

    await writeFile(currentDir, "")
      .then(() => process.stdout.write(styleText("green", "Operation succeeded \n")))
      .catch(() => process.stdout.write(styleText("red", "Operation failed \n")));

    return;
  } catch (error) {
    throw new Error(error);
  }
};
