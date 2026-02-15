"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { postUser } from "@/actions/server/auth";

const RegisterForm = ({ redirectTo }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const inputClass =
    "p-2 rounded-xl border border-black/10 bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-200";

  const validatePassword = (value) => {
    if (value.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(value)) return "Password needs one uppercase letter.";
    if (!/[a-z]/.test(value)) return "Password needs one lowercase letter.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const password = form.password.value;
    const validation = validatePassword(password);
    if (validation) {
      setError(validation);
      return;
    }

    const formData = {
      name: form.name.value,
      email: form.email.value,
      nidNo: form.nidNo.value,
      contactNo: form.contactNo.value,
      password,
      image: form.image.value,
      bloodgroup: form.bloodgroup.value,
    };

    startTransition(async () => {
      const result = await postUser(formData);
      if (!result?.success) {
        setError(result?.message || "Registration failed");
        return;
      }
      form.reset();
      router.push(redirectTo || "/");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-semibold">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your official name"
          required
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold">NID No</label>
          <input
            type="text"
            name="nidNo"
            placeholder="Enter NID number"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold">Contact Number</label>
          <input
            type="tel"
            name="contactNo"
            placeholder="01XXXXXXXXX"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            name="password"
            placeholder="At least 6 characters"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold">Blood Group</label>
          <select name="bloodgroup" required className={inputClass}>
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold">Profile Image URL</label>
          <input
            type="url"
            name="image"
            placeholder="https://example.com/image.jpg"
            className={inputClass}
          />
        </div>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
