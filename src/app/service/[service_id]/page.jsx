import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServiceById } from "@/data/services";

export async function generateMetadata({ params }) {
  const service = getServiceById(params.service_id);
  if (!service) return { title: "Service not found" };

  return {
    title: `${service.name} | Care.xyz`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }) {
  const service = getServiceById(params.service_id);
  if (!service) notFound();

  const session = await getServerSession(authOptions);
  const bookingLink = session
    ? `/booking/${service.id}`
    : `/login?redirect=/booking/${service.id}`;

  return (
    <div className="mx-auto max-w-5xl py-12">
      <div className="card p-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.3em] text-black/50">Service</p>
          <h1 className="section-title text-4xl font-semibold">{service.name}</h1>
          <p className="text-lg text-black/70">{service.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-4">
              <p className="text-xs text-black/50">Coverage</p>
              <p className="font-semibold">{service.coverage}</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-xs text-black/50">Starting price</p>
              <p className="font-semibold">BDT {service.rate.hour}/hour</p>
            </div>
          </div>
          <ul className="text-sm text-black/60 space-y-2">
            {service.highlights.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <div className="glass rounded-3xl p-6">
            <h2 className="section-title text-2xl font-semibold">Booking details</h2>
            <p className="text-sm text-black/60 mt-2">
              Select your duration and location, then confirm your booking instantly.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href={bookingLink} className="btn btn-primary w-full">
                Book this service
              </Link>
              <Link href="/" className="btn btn-outline w-full">
                Back to home
              </Link>
            </div>
          </div>
          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-black/50">What you get</p>
            <div className="mt-4 space-y-3 text-sm text-black/70">
              <p>Caregiver matching within 24 hours.</p>
              <p>Daily updates and check-ins.</p>
              <p>Invoice sent to your email after booking.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
