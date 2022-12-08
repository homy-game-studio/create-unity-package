#! /usr/bin/env node

import { oraPromise } from "ora";
import { createDirectory } from "./modules/directory";
import { createRepo } from "./modules/git";
import input from "./modules/input";
import { createProject, getUnityInstallations, openProject } from "./modules/unity";

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
    // const inputData = await input(availableVersions);
    const inputData = {
      unityVersion: "2020.3.40f1",
      packageName: "com.homy.develop",
      displayName: "Develop",
      author: {
        name: "Dev",
        email: 'dev@gmail.com',
      },
      namespace: "HGS.Develop",
    }
    const unityPath = unityInstallations[inputData.unityVersion];
    const projectPath = await run(createDirectory(inputData.packageName), "Create directory");
    await run(createProject(unityPath, projectPath), "Create unity project");
    await run(createRepo(projectPath), "Create git repo");
    await run(openProject(unityPath, projectPath), "Open unity project");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
