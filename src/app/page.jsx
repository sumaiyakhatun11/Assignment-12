import Link from "next/link";
import { services } from "@/data/services";

export const metadata = {
  title: "Care.xyz | Trusted Caregiving Services",
  description:
    "Book reliable baby care, elderly care, and special care services with verified caregivers and transparent pricing.",
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 py-16 items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-black/50">
            Care that feels like family
          </p>
          <h1 className="section-title text-4xl md:text-5xl font-semibold">
            Trusted caregivers for children, elders, and special needs at home.
          </h1>
          <p className="text-lg text-black/70">
            Care.xyz connects families with verified, compassionate caregivers. Book by the hour or day, track every booking, and stay confident in your loved ones' care.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#services" className="btn btn-primary">
              Explore services
            </Link>
            <Link href="/register" className="btn btn-outline">
              Create account
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-black/60">
            <span>Verified caregivers</span>
            <span>Flexible scheduling</span>
            <span>Transparent pricing</span>
          </div>
        </div>
        <div className="card p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] text-black/50">Care snapshot</span>
            <span className="text-sm font-semibold text-amber-600">Live availability</span>
          </div>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3">
                <div>
                  <p className="font-semibold">{service.name}</p>
                  <p className="text-xs text-black/50">{service.tagline}</p>
                </div>
                <Link href={`/service/${service.id}`} className="text-sm font-semibold text-orange-600">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
        <div className="card p-6">
          <h3 className="section-title text-xl font-semibold">Verified & trained</h3>
          <p className="text-sm text-black/60 mt-2">
            Every caregiver passes background checks and skill screenings before matching.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="section-title text-xl font-semibold">Flexible bookings</h3>
          <p className="text-sm text-black/60 mt-2">
            Choose hour-by-hour support or multi-day coverage for ongoing care needs.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="section-title text-xl font-semibold">Transparent pricing</h3>
          <p className="text-sm text-black/60 mt-2">
            See total cost instantly based on duration and service level.
          </p>
        </div>
      </section>

      <section id="services" className="py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">Services</p>
            <h2 className="section-title text-3xl font-semibold">Caregiving for every stage</h2>
          </div>
          <Link href="/register" className="btn btn-outline">
            Start booking
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="card p-6 flex flex-col gap-4">
              <div>
                <h3 className="section-title text-2xl font-semibold">{service.name}</h3>
                <p className="text-sm text-black/60">{service.coverage}</p>
              </div>
              <p className="text-sm text-black/70">{service.description}</p>
              <ul className="text-sm text-black/60 space-y-2">
                {service.highlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-sm font-semibold">From BDT {service.rate.hour}/hr</span>
                <Link href={`/service/${service.id}`} className="btn btn-primary">
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-black/50">Our mission</p>
          <h2 className="section-title text-3xl font-semibold mt-3">
            Making caregiving easy, safe, and accessible.
          </h2>
          <p className="text-sm text-black/70 mt-4">
            We combine vetted caregivers, smart booking tools, and real-time updates to give families peace of mind.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="glass rounded-2xl p-4 text-center">
              <p className="text-2xl font-semibold">4.9/5</p>
              <p className="text-xs text-black/60">Average rating</p>
            </div>
            <div className="glass rounded-2xl p-4 text-center">
              <p className="text-2xl font-semibold">12k+</p>
              <p className="text-xs text-black/60">Hours booked</p>
            </div>
          </div>
        </div>
        <div className="card p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-black/50">Testimonials</p>
          <div className="space-y-5 mt-5">
            <div className="glass rounded-2xl p-4">
              <p className="text-sm text-black/70">
                "Our caregiver handled everything with care and professionalism. The booking process was so easy."
              </p>
              <p className="text-xs text-black/50 mt-3">— Nabila, Dhaka</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-sm text-black/70">
                "Mom felt safe and supported. I loved the regular updates and clear pricing."
              </p>
              <p className="text-xs text-black/50 mt-3">— Rahim, Chattogram</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="card p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">How it works</p>
            <h2 className="section-title text-3xl font-semibold mt-3">Book care in three simple steps</h2>
            <div className="mt-6 space-y-4 text-sm text-black/70">
              <div className="glass rounded-2xl p-4">
                <p className="font-semibold">1. Choose a service</p>
                <p>Pick baby, elderly, or special care based on your needs.</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="font-semibold">2. Add time and location</p>
                <p>Select duration and share your address for precise scheduling.</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="font-semibold">3. Confirm and relax</p>
                <p>We match the caregiver and send updates to your dashboard.</p>
              </div>
            </div>
          </div>
          <div className="card p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">Care plans</p>
            <h2 className="section-title text-3xl font-semibold mt-3">Flexible plans for every family</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 text-sm">
              <div className="glass rounded-2xl p-4">
                <p className="font-semibold">Short visit</p>
                <p className="text-black/60">2-4 hours for quick support and check-ins.</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="font-semibold">Full day care</p>
                <p className="text-black/60">8-12 hours of structured care and updates.</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="font-semibold">Multi-day coverage</p>
                <p className="text-black/60">Ongoing care plans with dedicated caregivers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">Safety first</p>
            <h3 className="section-title text-2xl font-semibold mt-2">Trusted caregivers</h3>
            <p className="text-sm text-black/60 mt-3">
              Every caregiver is background checked and verified before they join.
            </p>
          </div>
          <div className="card p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">Updates</p>
            <h3 className="section-title text-2xl font-semibold mt-2">Real-time tracking</h3>
            <p className="text-sm text-black/60 mt-3">
              Receive check-ins and care notes right inside your dashboard.
            </p>
          </div>
          <div className="card p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">Support</p>
            <h3 className="section-title text-2xl font-semibold mt-2">Care team on call</h3>
            <p className="text-sm text-black/60 mt-3">
              Our support team is available 24/7 for urgent questions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="card p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-black/50">Get started</p>
            <h2 className="section-title text-3xl font-semibold mt-3">Ready to book trusted care?</h2>
            <p className="text-sm text-black/60 mt-3">
              Create an account and schedule care in minutes.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="btn btn-primary">
              Create account
            </Link>
            <Link href="/#services" className="btn btn-outline">
              View services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="card p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-black/50">FAQ</p>
          <h2 className="section-title text-3xl font-semibold mt-3">Frequently asked questions</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="glass rounded-2xl p-4">
              <p className="font-semibold">How do you verify caregivers?</p>
              <p className="text-black/60 mt-2">We run background checks and skill screenings before approval.</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="font-semibold">Can I cancel a booking?</p>
              <p className="text-black/60 mt-2">Yes, you can cancel pending or upcoming bookings from your dashboard.</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="font-semibold">Do you offer multi-day care?</p>
              <p className="text-black/60 mt-2">Yes, multi-day plans are available for extended support.</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="font-semibold">When is the payment captured?</p>
              <p className="text-black/60 mt-2">Payments are captured during Stripe checkout confirmation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
