import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { SiAuthelia } from "react-icons/si";

const RegisterPage = async ({ searchParams }) => {
  const resolvedParams = await Promise.resolve(searchParams);
  const redirectTo = resolvedParams?.redirect || "/";

  return (
    <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 py-12">
      <div className="card p-8">
        <h2 className="section-title text-3xl font-semibold mb-2">
          Create your Care.xyz account
        </h2>
        <p className="text-sm text-black/60 mb-6">
          Join a trusted community of caregivers and families.
        </p>
        <RegisterForm redirectTo={redirectTo} />
      </div>

      <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-5">
        <SiAuthelia size={84} className="text-orange-500" />
        <div>
          <p className="text-lg font-semibold">Already have an account?</p>
          <p className="text-sm text-black/60">
            Log in to book care or manage your bookings.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Link href={`/login?redirect=${redirectTo}`} className="btn btn-primary">
            Log in
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
