import NextLink, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

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
      <a {...rest}>{children}</a>
    </NextLink>
  ) : (
    <>{children}</>
  );
};
