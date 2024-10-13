import os from "os";

export const osHandler = async (...args) => {
  const EOL = JSON.stringify(os.EOL);

  args.forEach((item) => {
    switch (item) {
      case "--EOL":
        console.log(`Your EOL is: ${EOL}`);

        break;
      case "--cpus":
        if (!os.cpus()) return console.log("Unexpected Error: cpus not specified");

        console.log("\x1b[32m", `Total number of CPUs: ${os.cpus().length}`);
        os.cpus().forEach((item, index) => {
          console.log(
            "\x1b[35m",
            `CPU №${index + 1}: Model: ${item.model.trim()} & Speed ${item.speed / 1000}GHz`,
          );
        });

        break;
      case "--homedir":
        console.log(`Your home direction is: ${os.homedir()}`);

        break;
      case "--username":
        console.log(`Your username is ${os.userInfo().username}`);

        break;
      case "--architecture":
        console.log(`Architecture: ${os.arch()}`);

        break;
      case ".help":
        console.log("Available commands: --EOL --cpus --homedir --username --architecture");
        break;
      default:
        console.error(`Invalid argument: ${item}! Type os .help for more information.`);
    }
  });
};
