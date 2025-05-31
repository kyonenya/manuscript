import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'manuscript',
  description: '研究草稿管理アプリ',
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="ja">
      <body>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-700 print:bg-white">
          {props.children}
        </div>
      </body>
    </html>
  );
}
