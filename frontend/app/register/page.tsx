"use client";
import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../utils/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    try {
      const res = await api("/auth/register", "POST", { email, password });
      localStorage.setItem("token", res.accessToken);
      router.push("/dashboard");
    } catch (error) {
      console.error("Register failed", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
