import { Suspense } from 'react';
import { PostListSkelton } from '../(index)/PostList';
import { DemoPostList } from './DemoPostList';

export default function DemoIndexPage() {
  return (
    <Suspense fallback={<PostListSkelton />}>
      <DemoPostList />
    </Suspense>
  );
}
