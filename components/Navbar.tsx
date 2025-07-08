"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  async function handleLogout() {
    try {
      await axios.get("/api/auth/logout");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <div className="fixed flex justify-between w-full border border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <h1 className="text-lg font-semibold">Dume AI</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-2">
        <Link href="/dashboard/notes" className="mr-4">
          <button className="cursor-pointer">Notes</button>
        </Link>
        <Link href="/dashboard/tasks" className="mr-4">
          <button className="cursor-pointer">Tasks</button>
        </Link>
      </div>
      <Link
        onClick={handleLogout}
        href="/logout"
        className="max-w-7xl mx-auto px-4 py-2"
      >
        <button className="cursor-pointer">Logout</button>
      </Link>
    </div>
  );
}
