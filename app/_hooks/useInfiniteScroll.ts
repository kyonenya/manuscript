'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useInfiniteScroll = (props: { onScroll: () => void }) => {
  const { onScroll } = props;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    onScroll();
  }, [inView, onScroll]);

  return { scrollerRef: ref };
};
