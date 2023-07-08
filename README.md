## これはなんのアプリですか

自分が書き溜めている研究草稿を管理するための Web アプリ。  
日記アプリ [Day One](https://dayoneapp.com) からの JSON インポートや記事の一括印刷に対応。

自分用のアプリなので認証をかけてあるが、  
https://manuscript.vercel.app  
からログインしなくてもデモ版が閲覧できる。

## 使用技術

- Next.js でフロントエンドとバックエンドをまとめて一つのアプリとして開発中
  - バックエンドサーバーなるものを別個で立てたくないし、せっかくクラサバ両方 TypeScript で書いているのに API の型定義をわざわざフロント用に生成したくない
- v2.0.0 にて next@13.4 の React Server Components と Server Actions に対応
  - ついに API というものすら不要になった（rpc エンドポイントすら不要）
  - [refactor: Next.js 13.4 App Router への移行 #21](https://github.com/kyonenya/manuscript/pull/21)
- 使用技術：Next.js, ~~tRPC, Tanstack Query~~->Server Components & Server Actions, Prisma, PostgreSQL, ~~Chakra UI~~→Tailwind CSS, Vercel, Supabase Auth, Isomorphic JavaScript (Universal JavaScript)

## 使い方

<table>
   <tr>
      <td>検索と印刷</td>
      <td>インポートと編集</td>
   </tr>
   <tr>
      <td valign="top"><img alt="検索と印刷" src="https://github.com/kyonenya/manuscript/assets/62150154/c381510d-2536-416b-8883-738a40a96baa"/></td>
      <td valign="top"><img alt="インポートと編集" src="https://github.com/kyonenya/manuscript/assets/62150154/7e69c977-08e3-4606-81e6-f94d7000e03e"/></td>
   </tr>
</table>

## 旧バージョンとその反省

以前はフロントエンドの UI とバックエンドの API サーバーを別々に開発していた。

- [kyonenya/manuscripts-backend](https://github.com/kyonenya/manuscripts-backend)
  - バックエンドの API サーバー。記事の CRUD やデータベースとのやり取り
  - 使用技術：Node.js, TypeScript, express, PostgreSQL, Clean Architecture, 関数型プログラミング (fp-ts), Heroku
  - 反省点：Clean Architecture や関数型プログラミングにかぶれて、良く言えば疎結合で例外安全な、悪く言えばむやみに複雑なコードを書いた
- [kyonenya/manuscripts-frontend](https://github.com/kyonenya/manuscripts-frontend)
  - フロントエンドの SPA。マークダウンエディタで記事を作成・編集できる
  - 使用技術：preact, TypeScript, styled-components, Vercel
  - 反省点：アプリが持つべき機能の開発方針が中途半端だった
    - 日記アプリ [Day One](https://dayoneapp.com) のクローンアプリとして一通りの機能を実装し、Markdown エディタも用意して記事の作成や編集をできるようにした結果、記事データの二重管理になってしまいアプリを使わなくなった
    - ゆえに ReadOnly に倒し、インポートと印刷のみの機能に絞った
    - [feat: アプリの方針そのものの見直し · Issue #6 · kyonenya/manuscript](https://github.com/kyonenya/manuscript/issues/6)
