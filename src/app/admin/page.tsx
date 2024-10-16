"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<{ username: string; email: string }[]>([]);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (!currentUser || currentUser.username !== "admin") {
      router.push("/login");
    } else {
      const registeredUsers = JSON.parse(localStorage.getItem("users") || "[]");
      setUsers(registeredUsers);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-200 to-blue-200 py-8">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <div className="overflow-x-auto">
          {users.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr className="text-gray-700 text-sm uppercase">
                  <th className="py-4 px-6 border-b text-left">Username</th>
                  <th className="py-4 px-6 border-b text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition duration-150"
                  >
                    <td className="py-3 px-6 border-b">{user.username}</td>
                    <td className="py-3 px-6 border-b">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600">
              No users registered yet.
            </p>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white w-full py-3 rounded-lg mt-8 hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
