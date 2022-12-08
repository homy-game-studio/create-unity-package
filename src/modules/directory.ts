import { existsSync, mkdirSync, opendirSync } from "fs";
import path from "path"

export const createDirectory = async (directoryName: string) => {
  if (existsSync(directoryName)) {
    const dir = opendirSync(directoryName);
    const entry = await dir.read();
    dir.closeSync();
    if (!!entry) throw `Error: Directory ${directoryName} is not empty`;
  } else {
    mkdirSync(directoryName);
  }

  return path.resolve(directoryName);
}