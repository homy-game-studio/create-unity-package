import { Octokit } from "@octokit/rest";

export const createGitHubRepo = async (data: Record<string, any>) => {
  
  if(data.enableGit === false) return "";
  const token = data.GITHUB_ACCESS_TOKEN;
  const repoName = data.repoName;

  const octokit = new Octokit({ auth: token });
  try {
    const response = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      private: true,
    });

    return response.data.clone_url;
  } catch (error) {
    console.error(`Error when create repository on GitHub: ${error}`);
    process.exit(1);
  }
};
    