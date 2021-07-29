import { Input } from '@chakra-ui/react';

export const FileInput = () => {
  return (
    <Input
      type="file"
      onChange={(e) => {
        const jsonFile = e.target.files?.item(0);
        if (jsonFile == null || jsonFile.type !== 'application/json') return;

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          if (!e.target?.result) return;
          const result = JSON.parse(e.target.result as string);
          console.dir(result); // TODO onUpload（サーバーに送信するイベントハンドラ）に代入する
        };

        fileReader.readAsText(jsonFile);
      }}
    />
  );
};
