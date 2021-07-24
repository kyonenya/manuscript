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
  isEnabled = true,
  ...rest
}: {
  children: ReactNode;
  href: LinkProps['href'];
  isEnabled?: boolean;
  rest?: unknown[];
}) => {
  return isEnabled ? (
    <NextLink passHref href={href}>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </NextLink>
  ) : (
    <>{children}</>
  );
};
