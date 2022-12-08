#! /usr/bin/env node

import inquirer from "inquirer"

export interface Input {
  unityVersion: string,
  packageName: string,
  description: string,
  displayName: string,
  author: {
    name: string,
    email: string,
  },
  namespace: string,
}

export default async (availableVersions: string[]) => inquirer
  .prompt<Input>([
    {
      type: "list",
      message: "Unity Version",
      name: "unityVersion",
      choices: availableVersions
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
    }
  ]);