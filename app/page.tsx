"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return null; // Or any other desired content
}
