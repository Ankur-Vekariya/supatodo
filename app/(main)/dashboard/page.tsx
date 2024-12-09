"use client";
import withLogging from "@/HOC/withProtectedRoute";
import withProtectedRoute from "@/HOC/withProtectedRoute";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <div className="bg-white">
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
