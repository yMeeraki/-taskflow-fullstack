"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../utils/api";
import AuthForm from "../components/AuthForm";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }

      const res = await api("/auth/login", "POST", { email, password });

      localStorage.setItem("token", res.accessToken || res.token);
      localStorage.setItem("refreshToken", res.refreshToken);
      router.push("/dashboard");
      //   window.location.reload();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return <AuthForm title="Login" onSubmit={handleLogin} />;
}
