import { createReadStream, createWriteStream } from "node:fs";
import { resolve } from "path";
import { getAccessStatus } from "../../utils/getAccessStatus.js";

import { pipeline } from "node:stream/promises";
import zlib from "zlib";

export const compress = async (...args) => {
  try {
    const [pathToFile, pathToNewFile] = args;

    if (!pathToFile || !pathToNewFile)
      return console.error("Operation failed: Please check path to file or path directory");

    const resolvedPathToFile = resolve(pathToFile);
    const resolvedPathToNewFile = resolve(pathToNewFile);
    const isAccesedPathToFile = await getAccessStatus(resolvedPathToFile);

    if (!isAccesedPathToFile) return console.error("Operation failed: Please check path directory");

    const readStream = createReadStream(resolvedPathToFile);
    const writeStream = createWriteStream(resolvedPathToNewFile + ".br");
    const brotli = zlib.createBrotliCompress();

    await pipeline(readStream, brotli, writeStream);

    console.log("Done compressing 😎");
  } catch (error) {
    throw new Error(error);
  }
};
