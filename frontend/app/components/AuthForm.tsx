"use client";

import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthForm({ title, onSubmit }: any) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const isLogin = title === "Login";

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-foreground">
      <div
        className="bg-background/80 backdrop-blur-md w-full max-w-md p-8 rounded-2xl border border-primary shadow-2xl 
        text-foreground transition-all duration-300"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-primary">
          {title}
        </h1>
        <div className="mb-4 flex flex-col gap-1">
          <label className="text-sm text-foreground" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full p-3 rounded-xl 
              bg-white/30 dark:bg-white/20 
              text-foreground placeholder-gray-400 
              outline-none focus:ring-2 focus:ring-accent"
            placeholder="test2@gmail.com"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col gap-1">
          <label className="text-sm text-foreground" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full p-3 rounded-xl 
              bg-white/30 dark:bg-white/20 
              text-foreground placeholder-gray-400 
              outline-none focus:ring-2 focus:ring-accent"
            placeholder="123456"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="w-full bg-secondary hover:opacity-90 hover:bg-accent
            text-white p-3 rounded-xl font-semibold 
            transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer"
            onClick={() => onSubmit(email, password)}
          >
            {title}
          </button>
        </div>
        {/* SWITCH OPTION */}
        <p className="text-sm text-center text-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-primary font-bold hover:underline hover:text-accent cursor-pointer ml-1"
            onClick={() => router.push(isLogin ? "/register" : "/login")}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
