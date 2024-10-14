import { readdir, stat } from "node:fs/promises";
import { getAccessStatus } from "../../utils/getAccessStatus.js";

export const readDirHandler = async () => {
  try {
    const currentDir = process.cwd();
    const isAccesed = await getAccessStatus(currentDir);

    if (!isAccesed) return console.error("Operation failed: Please check path directory");

    const folder = await readdir(currentDir);

    const detailedInfo = await Promise.all(
      folder.map(async (file) => {
        const itemStat = await stat(file);
        return {
          Name: file,
          Type: itemStat.isDirectory() ? "directory" : "file",
        };
      }),
    );

    detailedInfo.sort((a, b) => (a.Type < b.Type ? -1 : 1));

    console.table(detailedInfo);

    return;
  } catch (error) {
    console.error("Error reading directory:", error.message);
  }
};
