import Link from "next/link";

export const metadata = {
  title: "Payment Success | Care.xyz",
};

const PaymentSuccessPage = ({ searchParams }) => {
  const sessionId = searchParams?.session_id;

  return (
    <div className="mx-auto max-w-4xl py-20 text-center">
      <div className="card p-10 space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">Payment received</p>
        <h1 className="section-title text-4xl font-semibold">Your booking is confirmed</h1>
        <p className="text-sm text-black/60">
          We are matching you with a caregiver now. You can track status updates in your bookings.
        </p>
        {sessionId ? (
          <p className="text-xs text-black/50">Session: {sessionId}</p>
        ) : null}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/my-bookings" className="btn btn-primary">
            View my bookings
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
