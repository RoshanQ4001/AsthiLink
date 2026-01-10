"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./dashboard.css";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  // 🔒 Protect route
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null; // prevent flash

  return (
    <main className="dashboard">
      <h1>Welcome back, {user.username} ✨</h1>
      <p>This is your aesthetic space.</p>

      <div className="dashboard-grid">
        <div className="dash-card">
          🎨
          <h3>Edit Profile</h3>
          <p>Customize colors, links & vibe</p>
        </div>

        <div className="dash-card">
          🔗
          <h3>Your Link</h3>
          <p>aesthilink.me/{user.username}</p>
        </div>

        <div className="dash-card">
          ⚡
          <h3>Live Editor</h3>
          <p>Instant preview while editing</p>
        </div>
      </div>
    </main>
  );
}
