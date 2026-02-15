import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: "Dashboard | FabricPulse",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?redirect=/dashboard");
  }

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="card p-8 space-y-4">
        <h1 className="section-title text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm text-black/70">
          Welcome back, {session.user?.email}. Your dashboard widgets will appear here.
        </p>
      </div>
    </div>
  );
}
