import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { resolve } from "path";

export const readFileHandler = async (arg) => {
  try {
    const destination = resolve(arg);

    const isAccesed = await access(destination)
      .then(() => true)
      .catch(() => false);

    if (!isAccesed) return console.error("Operation failed: Please check path directory");

    const detailedInfo = await stat(destination);

    const readStream = detailedInfo.isFile()
      ? createReadStream(destination, { encoding: "utf-8" })
      : "";

    if (!readStream) return console.error("This is a directory!");

    return new Promise((resolve, reject) => {
      let fileContent = "";
      readStream.on("data", (chunk) => {
        fileContent += chunk;
      });

      readStream.on("end", () => {
        console.log(fileContent);
        resolve();
      });

      readStream.on("error", (error) => {
        console.error(`Operation failed: ${error.message}`);
        reject(error);
      });
    });
  } catch (error) {
    throw new Error(error);
  }
};
