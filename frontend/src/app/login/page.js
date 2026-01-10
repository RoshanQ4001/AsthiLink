"use client";
import "../auth.css";
import Link from "next/link";
import { login as loginApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginApi(form);
    if (res.token) {
      login(res);
      router.push("/dashboard");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Welcome back 🌸</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
          <button>Login</button>
        </form>

        <span className="auth-footer">
          New here? <Link href="/signup">Create account</Link>
        </span>
      </div>
    </div>
  );
}
