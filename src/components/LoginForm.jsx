"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = ({ redirectTo }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push(redirectTo || "/my-bookings");
    });
  };

  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_LOGIN === "true";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Email</label>
        <input
          type="email"
          name="email"
          required
          className="p-2 rounded-xl border border-black/10"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Password</label>
        <input
          type="password"
          name="password"
          required
          className="p-2 rounded-xl border border-black/10"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
        {isPending ? "Signing in..." : "Log in"}
      </button>

      {googleEnabled ? (
        <button
          type="button"
          className="btn btn-outline w-full"
          onClick={() => signIn("google", { callbackUrl: redirectTo || "/my-bookings" })}
        >
          Continue with Google
        </button>
      ) : null}

      <p className="text-sm text-black/60 text-center">
        New here?{" "}
        <Link href={`/register?redirect=${redirectTo}`} className="text-orange-600 font-semibold">
          Create account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
