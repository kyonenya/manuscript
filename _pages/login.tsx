// @ts-ignore
import { Auth } from '@supabase/ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { supabase } from '../infra/supabase';

export default function Login() {
  const router = useRouter();
  const { user } = Auth.useUser();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  return (
    <div className="mx-auto max-w-md p-6">
      <h2 className="text-2xl font-bold">Sign in manuscript</h2>
      <Auth
        supabaseClient={supabase}
        view="sign_in"
        socialLayout="horizontal"
        socialButtonSize="xlarge"
      />
    </div>
  );
}
