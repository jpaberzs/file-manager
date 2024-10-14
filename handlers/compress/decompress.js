import { createReadStream, createWriteStream } from "node:fs";
import { resolve, join, basename } from "path";
import { access } from "node:fs/promises";

import { pipeline } from "node:stream/promises";
import zlib from "zlib";

export const decompress = async (...args) => {
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

    const fileName = basename(resolvedPathToFile).split(".")[0];
    const readStream = createReadStream(resolvedPathToFile);
    const writeStream = createWriteStream(resolvedPathToNewDirectory);
    const brotli = zlib.createBrotliDecompress();

    await pipeline(readStream, brotli, writeStream);

    console.log("Done compressing 😎");
  } catch (error) {
    throw new Error(error);
  }
};
