"use client";

import { useMemo, useState, useTransition } from "react";

const divisions = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barishal", "Rangpur", "Mymensingh"];
const districts = ["Dhaka", "Gazipur", "Narayanganj", "Cumilla", "Cox's Bazar", "Khulna", "Rajshahi", "Sylhet"];
const cities = ["Dhaka City", "Chattogram City", "Khulna City", "Sylhet City"];
const areas = ["Dhanmondi", "Gulshan", "Uttara", "Mirpur", "Agrabad", "GEC", "Zindabazar"];

const BookingForm = ({ service }) => {
  const [durationValue, setDurationValue] = useState(2);
  const [durationUnit, setDurationUnit] = useState("hour");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const totalCost = useMemo(() => {
    const rate = durationUnit === "day" ? service.rate.day : service.rate.hour;
    return rate * Number(durationValue || 0);
  }, [durationUnit, durationValue, service.rate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!division || !district || !city || !area || !address) {
      setError("Please complete all location fields.");
      return;
    }

    startTransition(async () => {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          durationValue,
          durationUnit,
          division,
          district,
          city,
          area,
          address,
        }),
      });

      let result = null;
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        result = await response.json();
      }

      if (!response.ok || !result?.url) {
        setError(result?.message || "Payment session failed. Check Stripe env vars.");
        return;
      }

      window.location.href = result.url;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="section-title text-2xl font-semibold">Book your care</h2>
        <p className="text-sm text-black/60">Select duration, set location, and confirm.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Duration</label>
          <input
            type="number"
            min="1"
            value={durationValue}
            onChange={(e) => setDurationValue(e.target.value)}
            className="p-2 rounded-xl border border-black/10"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Unit</label>
          <select
            value={durationUnit}
            onChange={(e) => setDurationUnit(e.target.value)}
            className="p-2 rounded-xl border border-black/10"
          >
            <option value="hour">Hour</option>
            <option value="day">Day</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Division</label>
          <select
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="p-2 rounded-xl border border-black/10"
          >
            <option value="">Select</option>
            {divisions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">District</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="p-2 rounded-xl border border-black/10"
          >
            <option value="">Select</option>
            {districts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 rounded-xl border border-black/10"
          >
            <option value="">Select</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Area</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="p-2 rounded-xl border border-black/10"
          >
            <option value="">Select</option>
            {areas.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold">Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="House, road, and landmark"
          className="p-2 rounded-xl border border-black/10"
        />
      </div>

      <div className="glass rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-black/50">Total cost</p>
          <p className="text-lg font-semibold">BDT {totalCost}</p>
        </div>
        <span className="text-xs text-black/50">Status: Pending</span>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
        {isPending ? "Redirecting..." : "Proceed to payment"}
      </button>
    </form>
  );
};

export default BookingForm;
