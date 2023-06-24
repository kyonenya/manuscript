import { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'manuscript',
  description: '研究草稿管理アプリ',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-700">
          {props.children}
        </div>
      </body>
    </html>
  );
}