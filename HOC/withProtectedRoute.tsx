// "use client"
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const withLogging = (WrappedComponent: React.ReactNode) => {
  return (props) => {
    const [session, setSession] = useState("");
    const router = useRouter();

    useEffect(() => {
      const getSession = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          // Handle error, e.g., display error message or redirect to login page
          console.error("Error fetching session:", error);
          router.push("/sign-in");
          return;
        }
        if (!data?.session) {
          router.push("/sign-in");
        } else {
          setSession(data?.session?.access_token);
        }
      };

      getSession();
    }, [router]);

    return session ? <WrappedComponent {...props} /> : null;
  };
};

export default withLogging;