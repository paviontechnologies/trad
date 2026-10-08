'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-300">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-white px-5 py-2.5 rounded-2xl shadow-xl shadow-indigo-950/40">
          <img src="/logo.png" alt="Pavion Technologies" className="h-8 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
          <p className="text-xs font-medium tracking-wide text-slate-400">Loading Enterprise Platform...</p>
        </div>
      </div>
    </div>
  );
}
