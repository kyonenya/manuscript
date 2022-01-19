import { useState } from 'react';

export const useJsonImport = <Data>(): {
  data: Data | undefined;
  load: (file: File) => void;
} => {
  const [data, setData] = useState<Data>();

  const load = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (!e.target?.result) return;
      const data = JSON.parse(e.target.result as string);
      setData(data);
    };
    fileReader.readAsText(file);
  };

  return { data, load };
};
