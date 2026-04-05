"use client";
import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../utils/api";
import AuthForm from "../components/AuthForm";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }

      const res = await api("/auth/register", "POST", { email, password });
      localStorage.setItem("token", res.accessToken);
      router.push("/dashboard");
    } catch (error) {
      console.error("Register failed", error);
    }
  };

  return (
    <AuthForm title="Register" onSubmit={handleRegister}/>
  );
}
