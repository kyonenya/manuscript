import { CopyIcon, SearchIcon, SettingsIcon, ViewIcon } from '@chakra-ui/icons';
import {
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ColorModeButton } from './ColorModeButton';
import { CustomPopover } from './CustomPopover';
import { HeaderContainer } from './HeaderContainer';
import { JsonImport } from './JsonImport';

type Form = { searchStr: string };

export const PostListHeader = (props: {
  searchStr: string | undefined;
  isSelectMode: boolean;
  onSearch: (data: Form) => void;
  toggleSelectMode: () => void;
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: {
      searchStr: props.searchStr,
    },
  });

  return (
    <HeaderContainer>
      <CustomPopover
        placement="bottom-end"
        triggerButton={<IconButton icon={<SettingsIcon />} aria-label="設定" />}
      >
        <ColorModeButton />
        <JsonImport />
      </CustomPopover>

      <form onSubmit={handleSubmit(props.onSearch)}>
        <InputGroup w={{ base: '60vw', md: 'sm' }}>
          <InputLeftElement
            p={1}
            borderColor={useColorModeValue('gray.300', 'gray.700')}
          >
            <IconButton aria-label="検索" icon={<SearchIcon />} size="sm" />
          </InputLeftElement>
          <Input
            {...register('searchStr')}
            type="text"
            aria-label="記事検索フォーム"
            placeholder="Search"
            borderColor={useColorModeValue('gray.300', 'gray.700')}
          />
        </InputGroup>
      </form>

      <Stack direction="row">
        <IconButton
          icon={<ViewIcon />}
          aria-label="プレビュー"
          onClick={() => router.push('?preview=true')}
        />
        <IconButton
          icon={<CopyIcon />}
          aria-label="複数選択"
          onClick={props.toggleSelectMode}
          bg={
            props.isSelectMode
              ? useColorModeValue('gray.300', 'gray.700')
              : undefined
          }
        />
      </Stack>
    </HeaderContainer>
  );
};
