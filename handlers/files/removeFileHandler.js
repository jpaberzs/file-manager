import { resolve } from "path";
import { access, unlink } from "node:fs/promises";

export const removeFileHandler = async (pathToFile) => {
  if (!pathToFile) return console.error("Operation failed: Please check path to file!");

  console.log(pathToFile);

  const resolvedPathToFile = resolve(pathToFile);

  const isAccesedPathToFile = await access(resolvedPathToFile)
    .then(() => true)
    .catch(() => false);

  if (!isAccesedPathToFile) return console.error("Operation failed: Please check path directory");

  try {
    await unlink(resolvedPathToFile);
  } catch (error) {
    throw new Error(error);
  }
};
