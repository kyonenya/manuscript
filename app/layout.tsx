import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'manuscript',
  description: '研究草稿管理アプリ',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{props.children}</body>
    </html>
  );
}
