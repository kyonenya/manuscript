import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { Entry } from '../../domain/Entry';
import {
  deleteOne,
  readOne,
  readTagList,
  updateOne,
} from '../../infra/entryRepository';
import { Article } from './Article';
import { ArticleHeader } from './ArticleHeader';

export const dynamic = 'force-dynamic';

export default async function ArticlePage(props0: {
  params: Promise<{ uuid: string }>;
}) {
  const params = await props0.params;

  const { uuid } = params;

  const entry = await readOne({ uuid });
  if (!entry) notFound();

  const tagHistory = await readTagList();

  const updateAction = async (props: { entry: Entry }) => {
    'use server';
    await updateOne(props);
    revalidatePath(`/${uuid}`);
    revalidatePath('/');
  };

  const deleteAction = async () => {
    'use server';
    await deleteOne({ uuid });
    revalidatePath(`/${uuid}`);
    revalidatePath('/');
    redirect('/');
  };

  return (
    <>
      <ArticleHeader
        entry={entry}
        tagHistory={tagHistory}
        updateAction={updateAction}
        deleteAction={deleteAction}
      />
      <Article entry={entry} />
    </>
  );
}
