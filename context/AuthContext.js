// Auth logic using localStorage
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();
    let isLoggedIn = false;
    const isAuthenticated = () => {
      if (typeof window !== "undefined") {
        isLoggedIn = localStorage?.getItem("isLoggedIn");
      }
      return isLoggedIn;
    };

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push("/login");
      }
    }, [router]);

    if (isAuthenticated()) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return Auth;
};
