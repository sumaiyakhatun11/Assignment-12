import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServiceById } from "@/data/services";
import { dbConnect } from "@/lib/dbConnect";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const service = getServiceById(payload.serviceId);

  if (!service) {
    return NextResponse.json({ message: "Service not found" }, { status: 404 });
  }

  const durationValue = Number(payload.durationValue);
  if (!durationValue || durationValue < 1) {
    return NextResponse.json({ message: "Invalid duration" }, { status: 400 });
  }

  const durationUnit = payload.durationUnit === "day" ? "day" : "hour";
  const rate = durationUnit === "day" ? service.rate.day : service.rate.hour;
  const totalCost = durationValue * rate;

  const location = {
    division: payload.division,
    district: payload.district,
    city: payload.city,
    area: payload.area,
    address: payload.address,
  };

  const missingLocation = Object.values(location).some((value) => !value);
  if (missingLocation) {
    return NextResponse.json({ message: "Location is required" }, { status: 400 });
  }

  const draft = {
    userEmail: session.user.email,
    serviceId: service.id,
    durationValue,
    durationUnit,
    location,
    totalCost,
    status: "PendingPayment",
    createdAt: new Date().toISOString(),
  };

  const draftResult = await dbConnect("bookingDrafts").insertOne(draft);

  if (!draftResult.acknowledged) {
    return NextResponse.json({ message: "Failed to create booking draft" }, { status: 500 });
  }

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  try {
    const stripe = getStripe();
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: session.user.email,
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "bdt",
            unit_amount: totalCost * 100,
            product_data: {
              name: `${service.name} care`,
              description: `${durationValue} ${durationUnit}(s) of care service`,
            },
          },
        },
      ],
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/booking/${service.id}?cancelled=true`,
      metadata: {
        draftId: draftResult.insertedId.toString(),
        serviceId: service.id,
        durationUnit,
        durationValue: durationValue.toString(),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    return NextResponse.json(
      { message: "Stripe checkout failed. Check STRIPE_SECRET_KEY." },
      { status: 500 }
    );
  }
}
