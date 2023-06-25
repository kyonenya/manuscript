import {
  EnvelopeIcon,
  KeyIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '../_components/Button';
import { Input } from '../_components/Input';

/**
 * ログインページ
 *
 * @see https://flowbite.com/blocks/marketing/login/
 */
export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const handleSignIn = async (formData: FormData) => {
    'use server';
    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signInWithPassword({
      email: String(formData.get('email')),
      password: String(formData.get('password')),
    });

    revalidatePath('/');
  };

  if (session) redirect('/');

  return (
    <section className="bg-gray-100 dark:bg-gray-700">
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
                <Input
                  required
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  inputLeftElement={<EnvelopeIcon className="w-5" />}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Password
                </label>
                <Input
                  required
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  inputLeftElement={<KeyIcon className="w-5" />}
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
                formAction={handleSignIn}
              >
                Sign in
              </Button>
              <p className="text-center text-sm text-teal-500">
                Don’t have an account yet?{' '}
                <Link href="#" className="hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
