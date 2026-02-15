import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib/dbConnect";

export const metadata = {
  title: "Profile | Care.IO",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?redirect=/profile");
  }

  const user = await dbConnect("users").findOne({ email: session.user?.email });

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="card p-8 space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-black/50">Profile</p>
          <h1 className="section-title text-3xl font-semibold">Your account</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-2xl overflow-hidden bg-black/5 flex items-center justify-center">
            {user?.image ? (
              <Image src={user.image} alt="User profile" width={80} height={80} />
            ) : (
              <span className="text-2xl font-semibold text-black/50">U</span>
            )}
          </div>
          <div>
            <p className="text-xl font-semibold">{user?.name || "User"}</p>
            <p className="text-sm text-black/60">{user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-4">
            <p className="text-xs text-black/50">Email</p>
            <p className="font-semibold break-all">{session.user?.email}</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <p className="text-xs text-black/50">Role</p>
            <p className="font-semibold">{session.role || "User"}</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <p className="text-xs text-black/50">Contact</p>
            <p className="font-semibold">{user?.contactNo || "-"}</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <p className="text-xs text-black/50">NID No</p>
            <p className="font-semibold">{user?.nidNo || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
