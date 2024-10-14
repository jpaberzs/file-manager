import { createReadStream } from "node:fs";
import { resolve } from "path";
import { access } from "node:fs/promises";
import { createHash } from "node:crypto";

export const hashHandler = async (pathToFile) => {
  if (!pathToFile) return console.error("Operation failed: Please check path to file!");

  const resolvedPathToFile = resolve(pathToFile);

  const isAccesedPathToFile = await access(resolvedPathToFile)
    .then(() => true)
    .catch(() => false);

  if (!isAccesedPathToFile) return console.error("Operation failed: Please check path directory");

  const hash = createHash("sha256");
  const readStream = createReadStream(resolvedPathToFile, { encoding: "utf-8" });

  return new Promise((resolve, reject) => {
    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    readStream.on("end", () => {
      const digest = hash.digest("hex");
      process.stdout.write(`${digest} \n`);
      resolve();
    });

    readStream.on("error", (error) => {
      console.error(`Operation failed: ${error.message}`);
      reject(error);
    });
  });
};
