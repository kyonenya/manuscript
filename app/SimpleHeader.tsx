'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { IconButton } from './_components/IconButton';
import { HeaderContainer } from './_components/containers';

export const SimpleHeader = () => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <IconButton onClick={() => router.back()}>
        <ArrowLeftIcon />
      </IconButton>
    </HeaderContainer>
  );
};
