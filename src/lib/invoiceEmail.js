export const sendInvoiceEmail = async ({ to, booking }) => {
  if (!process.env.RESEND_API_KEY) {
    return { skipped: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromAddress = process.env.RESEND_FROM || "Care.xyz <no-reply@care.xyz>";

  return resend.emails.send({
    from: fromAddress,
    to,
    subject: `Care.xyz invoice for ${booking.serviceName}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6">
        <h2>Booking invoice</h2>
        <p>Service: <strong>${booking.serviceName}</strong></p>
        <p>Duration: ${booking.durationValue} ${booking.durationUnit}(s)</p>
        <p>Total: <strong>BDT ${booking.totalCost}</strong></p>
        <p>Status: ${booking.status}</p>
        <p>We will contact you shortly with caregiver details.</p>
      </div>
    `,
  });
};
