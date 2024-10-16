"use client";

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export const Navbar: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    } else {
      setCurrentUser(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    router.push('/login');
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center text-white font-bold text-xl">
          <FaUser className="mr-2" /> MyKare {currentUser?.username?.toLocaleUpperCase()}
        </Link>
        <ul className="flex space-x-6 text-white">
          {currentUser ? (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center transition duration-200 hover:text-red-400"
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" className="flex items-center transition duration-200 hover:text-blue-200">
                <FaSignInAlt className="mr-1" /> Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
