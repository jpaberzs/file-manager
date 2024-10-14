// import { CONSTANTS } from "../constants.js";

import { dedicateFolderHandler, readDirHandler, upDirectoryHandler } from "./navigation/index.js";
import {
  addFileHandler,
  copyFileHandler,
  moveFileHandler,
  readFileHandler,
  removeFileHandler,
  renameFileHandler,
} from "./files/index.js";
import { osHandler } from "./os/index.js";
import { hashHandler } from "./hash/index.js";

export const indexHandler = async (line, readline) => {
  const [command, ...args] = line.trim().split(/\s+/g);

  switch (command) {
    case "up":
      await upDirectoryHandler();
      break;
    case "cd":
      await dedicateFolderHandler(...(args || ""));
      break;
    case "ls":
      await readDirHandler();
      break;
    case "cat":
      await readFileHandler(...(args || ""));
      break;
    case "add":
      await addFileHandler(...(args || ""));
      break;
    case "rn":
      await renameFileHandler(...(args || ""));
      break;
    case "cp":
      await copyFileHandler(...(args || ""));
      break;
    case "mv":
      await moveFileHandler(...(args || ""));
      break;
    case "rm":
      await removeFileHandler(args[0]);
      break;
    case "os":
      await osHandler(...(args || ""));
      break;
    case "hash":
      await hashHandler(args[0]);
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
