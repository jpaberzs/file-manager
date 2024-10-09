export const getUsername = () => {
  const argv = process.argv;
  const argumentsList = argv.slice(2, argv.length);

  const usernameArr = argumentsList.filter((arg) => arg.startsWith("--username="));

  if (usernameArr.length > 1) throw new Error("You can provide only one --username");
  if (usernameArr.length === 0) return null;

  return usernameArr[0].split("=")[1];
};
