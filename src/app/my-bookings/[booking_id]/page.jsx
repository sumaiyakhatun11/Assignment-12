import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getBookingById } from "@/actions/server/bookings";

export const metadata = {
  title: "Booking Details | Care.xyz",
};

export default async function BookingDetailPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?redirect=/my-bookings");
  }

  const resolvedParams = await Promise.resolve(params);
  const bookingId = Array.isArray(resolvedParams.booking_id)
    ? resolvedParams.booking_id[0]
    : resolvedParams.booking_id;
  const result = await getBookingById(bookingId);

  if (!result?.booking) {
    notFound();
  }

  const booking = result.booking;

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="card p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">Booking details</p>
            <h1 className="section-title text-3xl font-semibold">{booking.serviceName}</h1>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/5">
            {booking.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-4">
            <p className="text-xs text-black/50">Duration</p>
            <p className="font-semibold">
              {booking.durationValue} {booking.durationUnit}(s)
            </p>
          </div>
          <div className="glass rounded-2xl p-4">
            <p className="text-xs text-black/50">Total cost</p>
            <p className="font-semibold">BDT {booking.totalCost}</p>
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <p className="text-xs text-black/50">Location</p>
          <p className="font-semibold">
            {booking.location?.area}, {booking.location?.city}
          </p>
          <p className="text-sm text-black/60">
            {booking.location?.division}, {booking.location?.district} - {booking.location?.address}
          </p>
        </div>

        {booking.isDraft ? (
          <div className="glass rounded-2xl p-4">
            <p className="text-sm text-black/70">
              Payment is pending. Complete checkout to confirm this booking.
            </p>
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/my-bookings" className="btn btn-outline">
            Back to My Bookings
          </Link>
          <Link href={`/service/${booking.serviceId}`} className="btn btn-primary">
            View service
          </Link>
        </div>
      </div>
    </div>
  );
}
