日本語で応答してください。

## URLパス

- `/`：記事一覧ページ
  - searchParams で制御している `PostList` の逆順ソートやプレビュー表示は server component だと遅いので client component にしている
- `/[uuid]`：個別記事ページ
- `/demo`：記事一覧ページのデモ版
- `/demo/[uuid]`：個別記事ページのデモ版

## Next.js DevTools MCP

ユーザーが開発サーバーを起動していれば、`http://localhost:3000/_next/mcp` に接続することでルート情報・エラー・ログなどを取得できる。Chrome の起動は権限付きで実行すること。

## コーディング規約

- 一行で書けるものは一行で書く
- 一回しか使わないものを一時変数や関数や型定義に切り出さず、インラインで書く
