"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await api("/auth/login", "POST", { email, password });
      localStorage.setItem("token", res.token);
      localStorage.setItem("refreshToken", res.refreshToken);
      router.push("/dashboard");
    //   window.location.reload();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="test@gmail.com"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          placeholder="password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
