import { execa } from 'execa';
import path from 'path';
import process from 'process';

export type UnityInstallations = Record<string, string>;

const programFiles = process.env.ProgramFiles || path.resolve("C:/Program Files/");
const unityHubPath = process.env.UnityHub || path.join(programFiles, "Unity Hub", "Unity Hub.exe")

export const getUnityInstallations = async (): Promise<UnityInstallations> => {
  const { stdout } = await execa(unityHubPath, "-- --headless editors -i".split(" "), { reject: false });

  const isSuccess = stdout.includes(", installed at");
  if (!isSuccess) throw `Failed to execute command ${unityHubPath}. Consider create UnityHub env var`;

  const lines = stdout.split(/\r\n|\n/);
  const installations: UnityInstallations = {};

  lines.forEach(line => {
    const [version, path] = line
      .split(", installed at")
      .map(entry => entry.trim());

    if (!!version || !!path) installations[version] = path;
  });

  if (Object.keys(installations).length == 0) throw `No unity installations found at ${unityHubPath}.`;

  return installations;
}

export const createUnityProject = async (unityPath: string, projectPath: string) => {
  await execa(unityPath, ["-quit", "-batchmode", "-createProject", projectPath]);
}

export const openUnityProject = async (unityPath: string, projectPath: string) => {
  await execa(unityPath, ["-projectPath", projectPath], { stdio: "ignore" });
}