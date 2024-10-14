import { resolve } from "path";
import { unlink } from "node:fs/promises";
import { getAccessStatus } from "../../utils/getAccessStatus.js";

export const removeFileHandler = async (pathToFile) => {
  if (!pathToFile) return console.error("Operation failed: Please check path to file!");

  const resolvedPathToFile = resolve(pathToFile);

  const isAccesedPathToFile = await getAccessStatus(resolvedPathToFile);

  if (!isAccesedPathToFile) return console.error("Operation failed: Please check path directory");

  try {
    await unlink(resolvedPathToFile);
  } catch (error) {
    throw new Error(error);
  }
};
