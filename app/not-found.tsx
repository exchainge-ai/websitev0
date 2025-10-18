'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0C2B31]">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-gray-300 mb-8">Oops! Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-[#04C61B] to-[#6DF77E] text-[#0C2B31] rounded-lg font-bold hover:shadow-xl hover:shadow-[#04C61B]/30 transition-all inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
