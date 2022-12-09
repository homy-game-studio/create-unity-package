//@ts-ignore
import template from "template-directory";
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { renameSync } from "fs";
import fsExtra from "fs-extra"

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));
const base = resolve(__dirname, "../templates/base")
const ci = resolve(__dirname, "../templates/ci")

export const render = async (data: Record<string, any>, projectPath: string) => {
  await template(base, projectPath, data);

  if (data.enableCi) fsExtra.copySync(ci, projectPath, { overwrite: true });

  const oldRuntime = join(projectPath, "Assets/Package/Runtime", "HGS.Template.Runtime.asmdef");
  const newRuntime = join(projectPath, "Assets/Package/Runtime", `${data.namespace}.Runtime.asmdef`);

  const oldGitIgnore = join(projectPath, ".gitignore.template");
  const newGitIgnore = join(projectPath, ".gitignore");

  renameSync(oldRuntime, newRuntime);
  renameSync(oldGitIgnore, newGitIgnore);
}