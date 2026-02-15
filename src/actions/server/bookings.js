"use server";

import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib/dbConnect";
import { sendInvoiceEmail } from "@/lib/invoiceEmail";

export const getBookingsForUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, bookings: [] };
  }

  const bookings = await dbConnect("bookings")
    .find({ userEmail: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();

  return {
    success: true,
    bookings: bookings.map((booking) => ({
      id: booking._id.toString(),
      ...booking,
      _id: undefined,
    })),
  };
};

export const cancelBooking = async (bookingId) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { success: false, message: "Authentication required" };
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
