"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 rounded-2xl bg-background/50 backdrop-blur-xl border border-white/20 text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-2">Page not found 😢</p>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-xl"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}