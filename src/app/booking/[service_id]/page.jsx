import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServiceById } from "@/data/services";
import BookingForm from "./BookingForm";

export default async function BookingPage({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const serviceId = Array.isArray(resolvedParams.service_id)
    ? resolvedParams.service_id[0]
    : resolvedParams.service_id;
  const service = getServiceById(serviceId);
  if (!service) notFound();

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?redirect=/booking/${service.id}`);
  }

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
        <div className="card p-8 space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-black/50">Booking</p>
          <h1 className="section-title text-3xl font-semibold">{service.name}</h1>
          <p className="text-sm text-black/70">{service.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-4">
              <p className="text-xs text-black/50">Rate per hour</p>
              <p className="font-semibold">BDT {service.rate.hour}</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-xs text-black/50">Rate per day</p>
              <p className="font-semibold">BDT {service.rate.day}</p>
            </div>
          </div>
        </div>
        <div className="card p-8">
          <BookingForm service={service} />
        </div>
      </div>
    </div>
  );
}
