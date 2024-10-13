import { createReadStream, createWriteStream } from "node:fs";
import { access } from "node:fs/promises";
import { resolve, join, basename } from "path";

export const copyFileHandler = async (...args) => {
  try {
    const [pathToFile, pathToNewDirectory] = args;

    if (!pathToFile || !pathToNewDirectory)
      return console.error("Operation failed: Please check path to file or path directory");

    const resolvedPathToFile = resolve(pathToFile);
    const resolvedPathToNewDirectory = resolve(pathToNewDirectory);

    const isAccesedPathToFile = await access(resolvedPathToFile)
      .then(() => true)
      .catch(() => false);

    const isAccesedPathToNewDirectory = await access(resolvedPathToNewDirectory)
      .then(() => true)
      .catch(() => false);

    if (!isAccesedPathToFile) return console.error("Operation failed: Please check path directory");
    if (!isAccesedPathToNewDirectory)
      return console.error("Operation failed: Please check path directory");

    const fileName = basename(resolvedPathToFile);

    const readStream = createReadStream(resolvedPathToFile);
    const writeStream = createWriteStream(join(resolvedPathToNewDirectory, fileName));

    return new Promise((resolve, reject) => {
      readStream.on("error", (err) => {
        console.error("Operation failed while reading the file:", err.message);
        reject();
      });

      writeStream.on("error", (err) => {
        console.error("Operation failed while writing the file:", err.message);
        reject();
      });

      readStream.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log("Successfully copied");
        resolve();
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};
