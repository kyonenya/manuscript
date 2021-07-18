/* eslint-disable react-hooks/rules-of-hooks */
import { CopyIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  IconButton,
  InputGroup,
  Input,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ColorModeButton } from './ColorModeButton';
import { CustomPopover } from './CustomPopover';
import { HeaderContainer } from './HeaderContainer';

type Form = { keyword: string };

export const PostListHeader = (props: {
  keyword?: string;
  isSelectMode: boolean;
  onSearch: (data: Form) => void;
  toggleSelectMode: () => void;
}) => {
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: {
      keyword: props.keyword,
    },
  });

  return (
    <HeaderContainer>
      <CustomPopover
        placement="bottom-end"
        triggerButton={<IconButton icon={<SettingsIcon />} aria-label="設定" />}
      >
        <ColorModeButton />
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
            {...register('keyword')}
            type="text"
            aria-label="記事検索フォーム"
            placeholder="Search"
            borderColor={useColorModeValue('gray.300', 'gray.700')}
          />
        </InputGroup>
      </form>

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
    </HeaderContainer>
  );
};
