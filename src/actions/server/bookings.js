"use server";

import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib/dbConnect";
import { sendInvoiceEmail } from "@/lib/invoiceEmail";
import { getServiceById } from "@/data/services";

export const getBookingsForUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, bookings: [] };
  }

  const [bookings, drafts] = await Promise.all([
    dbConnect("bookings")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray(),
    dbConnect("bookingDrafts")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray(),
  ]);

  const draftBookings = drafts.map((draft) => {
    const service = getServiceById(draft.serviceId);
    return {
      id: `draft-${draft._id.toString()}`,
      serviceId: draft.serviceId,
      serviceName: service?.name || "Service",
      durationValue: draft.durationValue,
      durationUnit: draft.durationUnit,
      location: draft.location,
      totalCost: draft.totalCost,
      status: "PendingPayment",
      createdAt: draft.createdAt,
      isDraft: true,
    };
  });

  const confirmedBookings = bookings.map((booking) => ({
    id: booking._id.toString(),
    ...booking,
    _id: undefined,
  }));

  const combined = [...confirmedBookings, ...draftBookings].sort((a, b) =>
    String(b.createdAt || "").localeCompare(String(a.createdAt || ""))
  );

  return {
    success: true,
    bookings: combined,
  };
};

export const cancelBooking = async (bookingId) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, message: "Authentication required" };
  }

  if (String(bookingId).startsWith("draft-")) {
    const draftId = String(bookingId).replace("draft-", "");
    const result = await dbConnect("bookingDrafts").deleteOne({
      _id: new ObjectId(draftId),
      userEmail: session.user.email,
    });

    if (!result.deletedCount) {
      return { success: false, message: "Draft booking not found" };
    }

    revalidatePath("/my-bookings");
    return { success: true };
  }

  const booking = await dbConnect("bookings").findOne({
    _id: new ObjectId(bookingId),
    userEmail: session.user.email,
  });

  if (!booking) {
    return { success: false, message: "Booking not found" };
  }

  if (booking.status === "Completed") {
    return { success: false, message: "Completed bookings cannot be cancelled" };
  }

  await dbConnect("bookings").updateOne(
    { _id: new ObjectId(bookingId) },
    { $set: { status: "Cancelled" } }
  );

  revalidatePath("/my-bookings");

  return { success: true };
};

export const createBookingFromPayment = async ({
  userEmail,
  serviceId,
  serviceName,
  durationValue,
  durationUnit,
  location,
  totalCost,
  draftId,
}) => {
  const booking = {
    userEmail,
    serviceId,
    serviceName,
    durationValue,
    durationUnit,
    location,
    totalCost,
    status: "Confirmed",
    paymentStatus: "Paid",
    draftId,
    createdAt: new Date().toISOString(),
  };

  const result = await dbConnect("bookings").insertOne(booking);
  if (!result.acknowledged) {
    return { success: false };
  }

  try {
    await sendInvoiceEmail({ to: userEmail, booking });
  } catch (error) {
    console.error("Invoice email failed", error);
  }

  revalidatePath("/my-bookings");

  return { success: true, bookingId: result.insertedId.toString() };
};

export const getBookingById = async (bookingId) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, booking: null };
  }

  const isDraft = String(bookingId).startsWith("draft-");

  if (isDraft) {
    const draftId = String(bookingId).replace("draft-", "");
    const draft = await dbConnect("bookingDrafts").findOne({
      _id: new ObjectId(draftId),
      userEmail: session.user.email,
    });

    if (!draft) {
      return { success: false, booking: null };
    }

    const service = getServiceById(draft.serviceId);
    return {
      success: true,
      booking: {
        id: `draft-${draft._id.toString()}`,
        serviceId: draft.serviceId,
        serviceName: service?.name || "Service",
        durationValue: draft.durationValue,
        durationUnit: draft.durationUnit,
        location: draft.location,
        totalCost: draft.totalCost,
        status: "PendingPayment",
        createdAt: draft.createdAt,
        isDraft: true,
      },
    };
  }

  const booking = await dbConnect("bookings").findOne({
    _id: new ObjectId(bookingId),
    userEmail: session.user.email,
  });

  if (!booking) {
    return { success: false, booking: null };
  }

  return {
    success: true,
    booking: {
      id: booking._id.toString(),
      ...booking,
      _id: undefined,
    },
  };
};
