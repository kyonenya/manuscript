import { updateTag } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { Entry } from '../../domain/Entry';
import {
  deleteOne,
  readOne,
  readTagList,
  updateOne,
} from '../../infra/entryRepository';
import { Article, ArticleSkelton } from './Article';
import { ArticleHeader, ArticleHeaderEmpty } from './ArticleHeader';

async function updateAction(props: { entry: Entry }) {
  'use server';
  await updateOne(props);
  updateTag('entry');
}

async function deleteAction(uuid: string) {
  'use server';
  await deleteOne({ uuid });
  updateTag('entry');
  redirect('/');
}

async function ArticleContent(props: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await props.params;

  const entry = await readOne({ uuid });
  if (!entry) notFound();
  const tagHistory = await readTagList();

  return (
    <>
      <ArticleHeader
        entry={entry}
        tagHistory={tagHistory}
        updateAction={updateAction}
        deleteAction={deleteAction.bind(null, uuid)}
      />
      <Article entry={entry} />
    </>
  );
}

export default async function ArticlePage(props: {
  params: Promise<{ uuid: string }>;
}) {
  await connection();

  return (
    <Suspense
      fallback={
        <>
          <ArticleHeaderEmpty />
          <ArticleSkelton />
        </>
      }
    >
      <ArticleContent params={props.params} />
    </Suspense>
  );
}
