import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getBookingsForUser } from "@/actions/server/bookings";
import MyBookingsTable from "@/components/MyBookingsTable";

export const metadata = {
  title: "My Bookings | Care.xyz",
};

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?redirect=/my-bookings");
  }

  const result = await getBookingsForUser();

  return (
    <div className="mx-auto max-w-6xl py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-black/50">Dashboard</p>
          <h1 className="section-title text-3xl font-semibold">My bookings</h1>
        </div>
        <div className="text-sm text-black/60">Logged in as {session?.user?.email}</div>
      </div>
      <MyBookingsTable bookings={result.bookings} />
    </div>
  );
}
