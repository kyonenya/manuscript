'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { HeaderContainer } from './_components/HeaderContainer';
import { IconButton } from './_components/IconButton';

export const HeaderSkelton = () => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <IconButton onClick={() => router.back()}>
        <ArrowLeftIcon />
      </IconButton>
    </HeaderContainer>
  );
};
