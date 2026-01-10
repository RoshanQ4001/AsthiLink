"use client";
import "../auth.css";
import Link from "next/link";
import { signup } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    if (res.token) {
      login(res);
      router.push("/dashboard");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Create your profile ✨</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
          <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
          <button>Create account</button>
        </form>

        <span className="auth-footer">
          Already have an account? <Link href="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}
