import simpleGit, { SimpleGit } from "simple-git";

export const createRepo = async (path: string) => {
  const git: SimpleGit = simpleGit(path);
  await git.init();
  return git;
};

export const initAndPushRepo = async (
  git: SimpleGit,
  data: Record<string, any>,
  cloneUrl: string
): Promise<void> => {
  if (data.enableGit === false) return;

  try {
    await git.addRemote("origin", cloneUrl);
    await git.add(".");
    await git.commit("Initial commit");
    await git.push("origin", "master");
  } catch (error) {
    console.error(`Error to initialize and send remote repository: ${error}`);
    process.exit(1);
  }
};
