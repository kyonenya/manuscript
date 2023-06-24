import Link from 'next/link';
import { SimpleHeader } from './SimpleHeader';

/**
 * @see https://merakiui.com/components/404-pages
 */
export default function NotFound() {
  return (
    <>
      <SimpleHeader />
      <div className="container mx-auto my-auto flex items-center px-6 py-12 lg:py-20">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <p className="text-md font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn&apos;t exist.
          </p>
          <div className="mt-6 flex w-full items-center justify-center">
            <Link
              href="/"
              className="w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
