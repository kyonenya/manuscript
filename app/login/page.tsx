import {
  EnvelopeIcon,
  KeyIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../../components/Button';

/**
 * ログインページ
 *
 * @url https://flowbite.com/blocks/marketing/login/
 */
export default function Login() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-4 py-6 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="pb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-300">
              Sign in to manuscript
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="name@company.com"
                  // required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  // required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 mt-0.5 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                      // required=""
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-sm text-teal-500 hover:underline dark:text-teal-500"
                >
                  Forgot your password?
                </Link>
              </div>
              {/* <button
                type="submit"
                className="bg-green-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                Sign in
              </button> */}
              <Button
                leftIcon={<LockClosedIcon />}
                className="bg-emerald-500 text-white hover:bg-emerald-400"
              >
                Sign in
              </Button>
              <p className="text-center text-sm text-teal-500 dark:text-teal-500">
                Don’t have an account yet?{' '}
                <Link href="#" className="font-medium hover:underline">
                  Sign up
                </Link>
              </p>

              <div className="flex items-center rounded-md border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus-within:ring-blue-400">
                <div className="pl-3 text-gray-500 dark:text-gray-300">
                  {/* ここにHeroiconや任意のアイコンを入れてください */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </div>
                <input
                  className="w-full rounded-r-md bg-transparent py-2 pl-10 pr-3 text-gray-700 focus:outline-none dark:text-gray-200"
                  type="text"
                  placeholder="Your placeholder"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
