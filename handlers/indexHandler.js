export const indexHandler = async (line, readline) => {
  const [command, ...args] = line.trim().split(/\s+/g);

  console.log("Your command is: " + command);

  if (line === ".exit") {
    readline.close();
  }
};
