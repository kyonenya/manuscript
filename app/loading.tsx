import { HeaderSkelton } from './(index)/HeaderSkelton';
import { Spinner } from './_components/Spinner';

export default function Loading() {
  return (
    <>
      <HeaderSkelton />
      <div className="mt-8 flex justify-center">
        <Spinner />
      </div>
    </>
  );
}
