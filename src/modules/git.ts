import { simpleGit } from 'simple-git';

export const createRepo = async (path: string) => {
  simpleGit(path).init();
}