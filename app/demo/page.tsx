import { sampleEntries } from '../../domain/sampleEntries';
import { PostList } from '../PostList';
import { PostListHeader } from '../PostListHeader';

export default async function IndexPage({
  searchParams,
}: {
  searchParams: {
    keyword?: string;
    tag?: string;
    select?: string;
    preview?: string;
  };
}) {
  const isSelectMode = !!searchParams.select;
  const isPreviewMode = !!searchParams.preview;

  return (
    <>
      {!isPreviewMode && (
        <PostListHeader isSelectMode={isSelectMode} isDemoMode={true} />
      )}
      <PostList
        entries={sampleEntries}
        searchQuery={{ keyword: searchParams.keyword, tag: searchParams.tag }}
        isDemoMode={true}
      />
    </>
  );
}
