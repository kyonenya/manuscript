import { Spinner } from './_components/Spinner';
import { SimpleHeader } from './SimpleHeader';

export default function Loading() {
  return (
    <>
      <SimpleHeader />
      <div className="mt-8 flex justify-center">
        <Spinner />
      </div>
    </>
  );
}
