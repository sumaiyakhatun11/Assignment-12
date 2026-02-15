import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAdminOverview } from "@/actions/server/admin";

export const metadata = {
  title: "Admin Dashboard | Care.xyz",
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.role !== "admin") {
    redirect("/");
  }

  const data = await getAdminOverview();

  return (
    <div className="mx-auto max-w-6xl py-12 space-y-10">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">Admin</p>
        <h1 className="section-title text-3xl font-semibold">Dashboard overview</h1>
        <p className="text-sm text-black/60">Showing last 50 bookings and payments.</p>
      </div>

      <section className="card p-6">
        <h2 className="section-title text-2xl font-semibold mb-4">Recent bookings</h2>
        <div className="space-y-3">
          {data.bookings.length ? (
            data.bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-black/5 pb-3">
                <div>
                  <p className="font-semibold">{booking.serviceName}</p>
                  <p className="text-xs text-black/60">{booking.userEmail}</p>
                </div>
                <div className="text-xs text-black/60">
                  {booking.durationValue} {booking.durationUnit}(s) | {booking.location?.city}
                </div>
                <div className="text-sm font-semibold">BDT {booking.totalCost}</div>
                <span className="text-xs font-semibold">{booking.status}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-black/60">No bookings yet.</p>
          )}
        </div>
      </section>

      <section className="card p-6">
        <h2 className="section-title text-2xl font-semibold mb-4">Recent payments</h2>
        <div className="space-y-3">
          {data.payments.length ? (
            data.payments.map((payment) => (
              <div key={payment.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-black/5 pb-3">
                <div>
                  <p className="font-semibold">{payment.userEmail}</p>
                  <p className="text-xs text-black/60">Session {payment.sessionId}</p>
                </div>
                <div className="text-xs text-black/60">{payment.currency?.toUpperCase()}</div>
                <div className="text-sm font-semibold">{payment.amountTotal ? `BDT ${payment.amountTotal / 100}` : "-"}</div>
                <span className="text-xs font-semibold">{payment.status}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-black/60">No payments yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
