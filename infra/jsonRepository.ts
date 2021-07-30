import fs from 'fs';
import { DayOneEntry } from '../domain/DayOneEntry';

export const readAll = async (filePath: string): Promise<DayOneEntry[]> => {
  const json = await fs.promises.readFile(filePath, 'utf-8');
  return JSON.parse(json).entries;
};
