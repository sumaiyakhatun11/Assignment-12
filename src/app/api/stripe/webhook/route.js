import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { dbConnect } from "@/lib/dbConnect";
import { stripe } from "@/lib/stripe";
import { getServiceById } from "@/data/services";
import { createBookingFromPayment } from "@/actions/server/bookings";

export const runtime = "nodejs";

export async function POST(req) {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Webhook signature missing", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const draftId = session.metadata?.draftId;

    if (!draftId) {
      return NextResponse.json({ received: true });
    }

    const existingPayment = await dbConnect("payments").findOne({
      sessionId: session.id,
    });

    if (existingPayment) {
      return NextResponse.json({ received: true });
    }

    const draft = await dbConnect("bookingDrafts").findOne({
      _id: new ObjectId(draftId),
    });

    if (!draft) {
      return NextResponse.json({ received: true });
    }

    const service = getServiceById(draft.serviceId);
    if (!service) {
      return NextResponse.json({ received: true });
    }

    const bookingResult = await createBookingFromPayment({
      userEmail: draft.userEmail,
      serviceId: draft.serviceId,
      serviceName: service.name,
      durationValue: draft.durationValue,
      durationUnit: draft.durationUnit,
      location: draft.location,
      totalCost: draft.totalCost,
      draftId,
    });

    if (bookingResult.success) {
      await dbConnect("payments").insertOne({
        sessionId: session.id,
        paymentIntentId: session.payment_intent,
        amountTotal: session.amount_total,
        currency: session.currency,
        status: session.payment_status,
        userEmail: draft.userEmail,
        serviceId: draft.serviceId,
        bookingId: bookingResult.bookingId,
        createdAt: new Date().toISOString(),
      });

      await dbConnect("bookingDrafts").updateOne(
        { _id: new ObjectId(draftId) },
        { $set: { status: "Paid", paidAt: new Date().toISOString(), sessionId: session.id } }
      );
    }
  }

  return NextResponse.json({ received: true });
}
