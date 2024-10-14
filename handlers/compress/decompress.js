import { createReadStream, createWriteStream } from "node:fs";
import { resolve, extname } from "path";
import { writeFile } from "node:fs/promises";
import { getAccessStatus } from "../../utils/getAccessStatus.js";

import { pipeline } from "node:stream/promises";
import zlib from "zlib";

export const decompress = async (...args) => {
  try {
    const [pathToArchive, pathToNewFile] = args;

    if (!pathToArchive || !pathToNewFile)
      return console.error("Operation failed: Please check path to file or path directory");

    const resolvedPathToArchive = resolve(pathToArchive);
    const resolvedPathToNewFile = resolve(pathToNewFile);

    const isAccesedPathToArchive = await getAccessStatus(resolvedPathToArchive);

    const extName = extname(resolvedPathToNewFile);

    if (!isAccesedPathToArchive)
      return console.error("Operation failed: Please check path directory");

    if (extName) {
      await writeFile(resolvedPathToNewFile, "");
    } else {
      return console.error("Operation failed: Please check path directory");
    }

    const readStream = createReadStream(resolvedPathToArchive);
    const writeStream = createWriteStream(resolvedPathToNewFile);
    const brotli = zlib.createBrotliDecompress();

    await pipeline(readStream, brotli, writeStream);

    console.log("Done decompressing 😎");
  } catch (error) {
    throw new Error(error);
  }
};
