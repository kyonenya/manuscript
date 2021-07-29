import { ArrowUpIcon } from '@chakra-ui/icons';
import { IconButton, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';

type JsonObject = { [k: string]: unknown };

export const JsonInput = (props: {
  onUpload: (props: { obj: JsonObject }) => void;
}) => {
  const [obj, setObj] = useState<JsonObject>({});

  return (
    <Stack direction="row">
      <Input
        type="file"
        accept="application/json"
        onChange={(e) => {
          const jsonFile = e.target.files?.item(0);
          if (jsonFile == null) return;

          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            if (!e.target?.result) return;
            const result = JSON.parse(e.target.result as string);
            setObj(result);
          };

          fileReader.readAsText(jsonFile);
        }}
      />
      <IconButton
        aria-label="記事データをインポート"
        icon={<ArrowUpIcon />}
        onClick={() => props.onUpload({ obj })}
      />
    </Stack>
  );
};
