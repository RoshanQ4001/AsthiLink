"use client";
import Link from "next/link";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/" className="logo">
          AesthiLink
        </Link>
      </div>

      <div className="nav-right">
        <Link href="/login" className="nav-link">
          Login
        </Link>
        <Link href="/signup" className="nav-cta">
          Create profile ✨
        </Link>
      </div>
    </nav>
  );
}
