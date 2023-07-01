import { SimpleHeader } from './SimpleHeader';
import { Spinner } from './_components/Spinner';

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
