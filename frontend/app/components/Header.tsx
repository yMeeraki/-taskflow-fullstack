"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
      });
    } catch {}
    // clear tokens
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    // redirect to login
    router.push("/login");
  };

  return (
    <header
      className="sticky top-0 z-50 
  flex justify-between items-center px-6 py-4 
  bg-background backdrop-blur-xl 
  border-b border-white/20 
  shadow-md"
    >
      <h1
        className="text-lg font-semibold cursor-pointer text-primary transition hover:underline"
        onClick={() => router.push("/dashboard")}
      >
        Task Manager
      </h1>
      <button
        className="bg-secondary hover:opacity-90 hover:bg-accent
            text-white p-3 rounded-xl font-semibold 
            transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}
