"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib/dbConnect";

const requireAdmin = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.role !== "admin") {
    return null;
  }
  return session;
};

export const getAdminOverview = async () => {
  const session = await requireAdmin();
  if (!session) {
    return { success: false, bookings: [], payments: [] };
  }

  const bookings = await dbConnect("bookings")
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  const payments = await dbConnect("payments")
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  return {
    success: true,
    bookings: bookings.map((booking) => ({
      id: booking._id.toString(),
      ...booking,
      _id: undefined,
    })),
    payments: payments.map((payment) => ({
      id: payment._id.toString(),
      ...payment,
      _id: undefined,
    })),
  };
};
