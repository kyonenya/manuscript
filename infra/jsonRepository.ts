import fs from 'fs';

export const read = async <T>(filePath: string): Promise<T> => {
  const json = await fs.promises.readFile(filePath, 'utf-8');
  return JSON.parse(json) as T;
};
