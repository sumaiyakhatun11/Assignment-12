"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cancelBooking } from "@/actions/server/bookings";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  PendingPayment: "bg-orange-100 text-orange-700",
  Confirmed: "bg-emerald-100 text-emerald-700",
  Completed: "bg-slate-200 text-slate-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

const MyBookingsTable = ({ bookings }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCancel = (bookingId) => {
    startTransition(async () => {
      await cancelBooking(bookingId);
      router.refresh();
    });
  };

  if (!bookings?.length) {
    return (
      <div className="card p-8 text-center">
        <p className="text-lg font-semibold">No bookings yet</p>
        <p className="text-sm text-black/60 mt-2">
          Book a service to see it appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="card p-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6">
          <div className="space-y-2">
            <p className="text-lg font-semibold">{booking.serviceName}</p>
            <p className="text-sm text-black/60">
              {booking.durationValue} {booking.durationUnit}(s) in {booking.location?.area}, {booking.location?.city}
            </p>
            <p className="text-sm text-black/60">
              {booking.location?.division}, {booking.location?.district} - {booking.location?.address}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-black/50">Total cost</p>
            <p className="text-lg font-semibold">BDT {booking.totalCost}</p>
            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[booking.status] || "bg-slate-200 text-slate-700"}`}>
              {booking.status}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <Link className="btn btn-outline" href={`/my-bookings/${booking.id}`}>
              View details
            </Link>
            <button
              className="btn btn-primary"
              type="button"
              disabled={
                isPending ||
                booking.status === "Cancelled" ||
                booking.status === "Completed"
              }
              onClick={() => handleCancel(booking.id)}
            >
              Cancel booking
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookingsTable;
