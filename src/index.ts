#! /usr/bin/env node

import { oraPromise } from "ora";
import { createDirectory } from "./modules/directory";
import { createGitHubRepo } from "./modules/github";
import { createRepo as createGitRepo, initAndPushRepo } from "./modules/git";
import input from "./modules/input";
import { render as renderTemplate } from "./modules/render";
import { createUnityProject, getUnityInstallations, openUnityProject, parseUnityVersion } from "./modules/unity";

const run = <T>(promise: Promise<T>, text: string) => {
  return oraPromise(
    promise,
    { text }
  );
}

const main = async () => {
  try {
    const unityInstallations = await run(getUnityInstallations(), "Get unity installations");
    const availableVersions = Object.keys(unityInstallations);
    const inputData = await input(availableVersions);
    const unityPath = unityInstallations[inputData.unityVersion];
    const projectPath = await run(createDirectory(inputData.packageName), "Create directory");
    await run(createUnityProject(unityPath, projectPath), "Create unity project");
    
    const git = await run(createGitRepo(projectPath), "Create git repo");
    const cloneUrl = await createGitHubRepo(inputData);
    
    const renderData = {
      ...inputData,
      unityVersion: parseUnityVersion(inputData.unityVersion)
    }
    await run(renderTemplate(renderData, projectPath), "Render template");
    await run(initAndPushRepo(git, inputData, cloneUrl), "Deploy on Github repository");
    await run(openUnityProject(unityPath, projectPath), "Open unity project");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
