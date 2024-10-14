import readline from "node:readline/promises";
import { stdin as input, stdout as output, cwd } from "node:process";
import { homedir } from "os";

import { getUsername } from "./utils/getUsername.js";
import { indexHandler } from "./handlers/indexHandler.js";

import { styleText } from "node:util";

const initApp = () => {
  const username = getUsername() || "Anonymous";
  const rl = readline.createInterface({ input, output });

  process.chdir(homedir());
  process.stdout.write(`Welcome to the File Manager, ${username}! \n`);
  process.stdout.write(styleText("green", `You are currently in ${cwd()} \n`));

  rl.on("line", async (line) => {
    if (!line) {
      console.error("Invalid input. Type 'help' for a list of available commands.");
      process.stdout.write(styleText("green", `You are currently in ${cwd()} \n`));
      return;
    }

    const inputArgs = line
      .trim()
      .match(/(?:[^\s'"]+|['"][^'"]*['"])/g)
      .map((arg) => arg.replace(/['"]/g, ""));

    await indexHandler(inputArgs, rl);

    process.stdout.write(styleText("green", `You are currently in ${cwd()} \n`));
  });

  rl.on("close", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });

  rl.on("error", () => {
    console.error(`An unexpected error occurred`);
  });
};

initApp();
