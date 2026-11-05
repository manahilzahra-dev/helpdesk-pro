import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import jwt from "jsonwebtoken";
import DashboardClient from "./DashboardClient";

// ✅ 'any' ki jagah type define kiya
interface DecodedToken {
  userId: string;
  role: string;
}

async function ProtectedDashboard() {
  await connection();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    redirect("/login");
  }

  let userRole = "user"; 

  try {
    const decoded = jwt.verify(token, secret) as DecodedToken; // ✅ Type use kiya
    userRole = decoded.role; 
  } catch {
    redirect("/login");
  }

  return <DashboardClient userRole={userRole} />;
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-slate-500">
          Loading dashboard...
        </div>
      }
    >
      <ProtectedDashboard />
    </Suspense>
  );
}