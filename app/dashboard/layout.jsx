"use client";
import { useEffect } from "react";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import Navbar from "../ui/dashboard/navbar/navbar";
import { useRouter } from "next/navigation";
import { getTokenFromCookies } from "@/service/auth";
import { AuthProvider } from "@/service/utils/authContext";

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const authToken = getTokenFromCookies();
    if (!authToken) {
      router.push("/login");
    }
  }, [router]);
  return (
    <AuthProvider>
      <div className="dashboard-page flex min-h-[100vh]">
        <div className="w-[200px] fixed h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 px-4 py-4 ml-[200px]">
          <div>
            <Navbar />
          </div>
          <div className="py-4">{children}</div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Layout;
