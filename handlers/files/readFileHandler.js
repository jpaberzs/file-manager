import { access, readFile, stat } from "node:fs/promises";
import { resolve } from "path";

export const readFileHandler = async (arg) => {
  try {
    const destination = await resolve(arg);

    const isAccesed = await access(destination)
      .then(() => true)
      .catch(() => false);

    if (!isAccesed) return console.error("Operation failed: Please check path directory");

    const detailedInfo = await stat(destination);

    if (detailedInfo.isFile()) {
      const file = await readFile(destination, "utf-8");
      console.log(file);
    } else {
      console.error("This is a directory!");
    }

    return;
  } catch (error) {
    throw new Error(error);
  }
};
