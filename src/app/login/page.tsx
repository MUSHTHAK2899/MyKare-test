"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    usernameOrEmail?: string;
    password?: string;
  }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { usernameOrEmail?: string; password?: string } = {};

    if (!usernameOrEmail) {
      newErrors.usernameOrEmail = "Username or Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const admin = { username: "admin", password: "admin" };

    if (usernameOrEmail === admin.username && password === admin.password) {
      localStorage.setItem("currentUser", JSON.stringify(admin));
      router.push("/admin");
      return;
    }

    const user = users.find(
      (user: any) =>
        (user.username === usernameOrEmail || user.email === usernameOrEmail) &&
        user.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      router.push("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleUsernameOrEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameOrEmail(e.target.value);
    if (errors.usernameOrEmail) {
      setErrors((prevErrors) => ({ ...prevErrors, usernameOrEmail: "" }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={handleUsernameOrEmailChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.usernameOrEmail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.usernameOrEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.usernameOrEmail}
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
