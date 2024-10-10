// import { CONSTANTS } from "../constants.js";

import { dedicateFolderHandler, readDirHandler, upDirectoryHandler } from "./navigation/index.js";
import { readFileHandler } from "./files/index.js";

export const indexHandler = async (line, readline) => {
  const [command, ...args] = line.trim().split(/\s+/g);

  switch (command) {
    case "up":
      await upDirectoryHandler();
      break;
    case "cd":
      await dedicateFolderHandler(args[0] || "");
      break;
    case "ls":
      await readDirHandler();
      break;
    case "cat":
      await readFileHandler(args[0] || "");
      break;
    case "help":
      console.log("Available commands: up, help, and .exit");
      break;
    case ".exit":
      readline.close();
      break;
    default:
      console.error("Invalid input. Type 'help' for a list of available commands.");
      break;
  }
};
