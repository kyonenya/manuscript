import {
  EnvelopeIcon,
  KeyIcon,
  LockClosedIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
// import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
// import { cookies } from 'next/headers';
import Link from 'next/link';
// import { redirect } from 'next/navigation';
import { Button } from '../_components/Button';
import { Input } from '../_components/Input';
// import { useLoginStatus } from '../_hooks/useLoginStatus';

/**
 * Login Page
 *
 * @see https://flowbite.com/blocks/marketing/login/
 */
export default async function LoginPage() {
  // const { isLoggedIn } = await useLoginStatus();

  // if (isLoggedIn) redirect('/');

  const signInAction = async (formData: FormData) => {
    //   'use server';
    //   const supabase = createServerActionClient({ cookies });
    //   await supabase.auth.signInWithPassword({
    //     email: String(formData.get('email')),
    //     password: String(formData.get('password')),
    //   });

    revalidatePath('/');
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-700">
      <div className="mx-auto flex flex-col items-center justify-center px-4 py-6 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="p-6 sm:p-8">
            <h1 className="mb-4 pb-2 text-2xl font-bold leading-tight tracking-tight text-gray-700 dark:text-gray-300">
              Sign in to manuscript
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <Input
                  required
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  leftIcon={<EnvelopeIcon />}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <Input
                  required
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  leftIcon={<KeyIcon />}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      aria-describedby="remember"
                      type="checkbox"
                      className="h-4 w-4 rounded"
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
                  className="text-sm text-teal-500 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Button
                type="submit"
                variant={{ color: 'emerald' }}
                leftIcon={<LockClosedIcon />}
                formAction={signInAction}
              >
                Sign in
              </Button>
            </form>
            <div className="text-center">
              <div className="my-4 flex items-center justify-center">
                <hr className="mx-3 flex-grow border-gray-300 dark:border-gray-500" />
                <div className="text-gray-500 dark:text-gray-300">or</div>
                <hr className="mx-3 flex-grow border-gray-300 dark:border-gray-500" />
              </div>
              <Link href="/" passHref>
                <Button type="button" leftIcon={<UsersIcon />}>
                  Try Demo Version
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
