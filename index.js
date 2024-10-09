import readline from "node:readline/promises";
import { stdin as input, stdout as output, cwd } from "node:process";
import { getUsername } from "./utils/getUsername.js";
import { indexHandler } from "./handlers/indexHandler.js";

const initApp = () => {
  const username = getUsername() || "Anonymous";
  const rl = readline.createInterface({ input, output });

  console.log(`Welcome to the File Manager, ${username}!`);

  rl.on("line", async (line) => {
    await indexHandler(line, rl);

    process.stdout.write(`You are currently in ${cwd()} \n`);
  });

  rl.on("close", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });

  rl.on("error", () => {
    console.error(`An unexpected error occurred`);
  });
};

initApp();
