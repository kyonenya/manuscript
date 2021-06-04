import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

/**
 * NextLink with Chakra UI
 * @url https://twitter.com/thesegunadebayo/status/1389894533173977089
 */
export const Link = ({
  children,
  href,
  prefetch = true,
  ...rest
}: {
  children: ReactNode;
  href: LinkProps['href'];
  prefetch?: boolean;
  rest?: unknown[];
}) => {
  return (
    <NextLink passHref href={href} prefetch={prefetch}>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </NextLink>
  );
};