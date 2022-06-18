## これはなんのアプリですか

自分が書き溜めている研究草稿の管理用Webアプリ。Next.jsのAPI Routesを用いて、フロントエンドとバックエンドをまとめて一つのアプリとして開発中。

- 使用技術：Next.js, TypeScript, React Query, Chakra UI, supabase (PostgreSQL, Auth), Clean Architecture, Universal JavaScript (Isomorphic JavaScript), vercel

## 旧バージョンとその反省

以前はフロントエンドのUIとバックエンドのAPIサーバーを別々に開発していた。

- [kyonenya/manuscripts-backend](https://github.com/kyonenya/manuscripts-backend)
  - バックエンドのAPIサーバー、記事のCRUDとデータベースとのやり取り
  - 使用技術：Node.js, TypeScript, express, PostgreSQL, Clean Architecture, 関数型プログラミング(fp-ts), Heroku
  - 反省点：Clean Architectureや関数型プログラミングにかぶれて、良く言えば疎結合で例外安全な、悪く言えばむやみに複雑なコードを書いた
- [kyonenya/manuscripts-frontend](https://github.com/kyonenya/manuscripts-frontend)
  - フロントのUI、マークダウンエディタで記事を作成・編集できる
  - 使用技術：preact, TypeScript, styled-components, vercel
  - 反省点：アプリが持つべき機能の開発方針が中途半端だった
    - [feat: アプリの方針そのものの見直し · Issue #6 · kyonenya/manuscript](https://github.com/kyonenya/manuscript/issues/6)
    - 自分が普段使いしている日記ソフトのクローンアプリとして、とくに理由なく一通りの機能を実装しようとしていた
    - そのためマークダウンエディタを用意して記事の作成や編集をできるようにした結果、記事データの二重管理になってしまい、アプリを使わなくなった

## メモ（2022/06/19）

- react-markdownは6系で止めておく。"TypeError: A dynamic import callback was not specified."エラーが出るため
- chakra-ui-markdown-rendererは3系で止めておく。4.0.0は不安定で動作せず
