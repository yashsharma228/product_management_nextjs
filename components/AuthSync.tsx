'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthSync() {
  const { data: session, status } = useSession();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const user = session.user as any;
      login(user, user.token);
    } else if (status === 'unauthenticated') {
        // Optional: clear store if session is gone
        // logout();
    }
  }, [session, status, login]);

  return null;
}
