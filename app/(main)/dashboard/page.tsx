"use client";
import withLogging from "@/HOC/withProtectedRoute";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React from "react";

function Dashboard() {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/sign-in");
    if (error) {
      alert("sign out error");
    }
  };

  return (
    <div className="text-black bg-white h-full">
      Dashboard
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}

export default withLogging(Dashboard);
