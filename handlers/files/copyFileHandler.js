export const copyFileHandler = async (...args) => {
  try {
    const [pathToFile, newFileName] = args;

    if (!pathToFile || !newFileName)
      return console.error("Operation failed: Please check path to file or name of the new file");
  } catch (error) {
    throw new Error(error);
  }
};
