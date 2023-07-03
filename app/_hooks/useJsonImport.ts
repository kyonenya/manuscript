'use client';

import { useState } from 'react';

export const useJsonImport = <Data>(): {
  data: Data | undefined;
  setFile: (file: File) => void;
} => {
  const [data, setData] = useState<Data>();

  const setFile = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (!e.target?.result) return;
      const data = JSON.parse(e.target.result as string);
      setData(data);
    };
    fileReader.readAsText(file);
  };

  return { data, setFile };
};
