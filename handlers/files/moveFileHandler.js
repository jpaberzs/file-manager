import { copyFileHandler } from "./copyFileHandler.js";
import { removeFileHandler } from "./removeFileHandler.js";

export const moveFileHandler = async (...args) => {
  const [pathToFile, pathToNewDirectory] = args;

  if (!pathToFile || !pathToNewDirectory)
    return console.error("Operation failed: Please check path to file or path directory");

  try {
    await copyFileHandler(pathToFile, pathToNewDirectory).catch((err) => {
      console.error(err.message);
    });
    isError ? await removeFileHandler(pathToFile).catch((err) => console.error(err.message)) : "";
  } catch (error) {
    throw new Error(error);
  }
};
