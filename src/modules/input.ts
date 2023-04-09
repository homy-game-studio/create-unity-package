#! /usr/bin/env node

import inquirer from "inquirer";

export interface Input {
  unityVersion: string;
  packageName: string;
  description: string;
  displayName: string;
  author: {
    name: string;
    email: string;
  };
  namespace: string;
}

export interface GitConditionals{
  repoName?: string;
  username?: string;
  GITHUB_ACCESS_TOKEN?: string;
}

const getConditionalInputs = async (enableGit: boolean): Promise<GitConditionals> => {
  if (!enableGit) {
    return {};
  }

  const gitInputs = await inquirer.prompt<GitConditionals>([
    {
      type: "input",
      name: "repoName",
      message: "Name of repository:",
    },
    {
      type: "input",
      name: "GITHUB_ACCESS_TOKEN",
      message: "Personal Token Access of GitHub:",
    },
  ]);

  return gitInputs;
};

export default async (availableVersions: string[]) => {

  const mainInputs = await inquirer.prompt<Input>([
    {
      type: "list",
      message: "Unity Version",
      name: "unityVersion",
      choices: availableVersions,
    },
    {
      type: "input",
      message: "Package Name (com.company.my-system)",
      name: "packageName",
    },
    {
      type: "input",
      message: "Display Name (My System)",
      name: "displayName",
    },
    {
      type: "input",
      message: "Description",
      name: "description",
    },
    {
      type: "input",
      message: "Author (Rick Morty)",
      name: "author.name",
    },
    {
      type: "input",
      message: "Email (mail@example.com)",
      name: "author.email",
    },
    {
      type: "input",
      message: "Scripts Namespace (Company.MySystem)",
      name: "namespace",
    },
    {
      type: "confirm",
      message: "Enable Github Actions + Semantic Release",
      name: "enableCi",
    },
  ]);

  const enableDeploy = await inquirer.prompt([
    {
      type: "confirm",
      message: "Enable Github Deploy",
      name: "enableGit",
    },
  ])

  const conditionalInputs = await getConditionalInputs(enableDeploy.enableGit);
  return { ...mainInputs, ...conditionalInputs };
}
