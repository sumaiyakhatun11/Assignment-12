import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Login | Care.xyz",
};

const LoginPage = ({ searchParams }) => {
  const redirectTo = searchParams?.redirect || "/my-bookings";

  return (
    <div className="mx-auto max-w-5xl py-12 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10">
      <div className="card p-8">
        <h1 className="section-title text-3xl font-semibold">Welcome back</h1>
        <p className="text-sm text-black/60 mt-2">Log in to manage your bookings and caregivers.</p>
        <LoginForm redirectTo={redirectTo} />
      </div>
      <div className="glass rounded-3xl p-8 flex flex-col justify-center gap-6">
        <p className="text-sm uppercase tracking-[0.3em] text-black/50">Care.xyz promise</p>
        <h2 className="section-title text-2xl font-semibold">Secure access to trusted care</h2>
        <p className="text-sm text-black/60">
          We keep your family details protected while giving you full visibility into every booking.
        </p>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="glass rounded-2xl p-4">
            <p className="text-lg font-semibold">24/7</p>
            <p className="text-xs text-black/60">Support</p>
          </div>
          <div className="glass rounded-2xl p-4">
            <p className="text-lg font-semibold">100%</p>
            <p className="text-xs text-black/60">Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
