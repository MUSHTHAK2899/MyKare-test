"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 to-blue-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {user ? (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Welcome, {user.username}!
            </h1>
            <p className="text-gray-600 text-center mb-4">
              You are successfully logged in. Enjoy your time on the dashboard!
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white w-full py-3 rounded-lg hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Loading...
          </h1>
        )}
      </div>
    </div>
  );
}
