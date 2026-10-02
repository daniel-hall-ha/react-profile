import nodemailer from "nodemailer";

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.ADMIN_EMAIL);
}

export async function sendOtpEmail(code) {
  const to = process.env.ADMIN_EMAIL;
  if (!smtpConfigured()) {
    const error = new Error("SMTP is not configured. Fill in .env SMTP_* and ADMIN_EMAIL.");
    error.status = 500;
    throw error;
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = String(process.env.SMTP_SECURE).toLowerCase() === "true";
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: (process.env.SMTP_PASS || "").replace(/\s/g, ""),
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: "Your admin OTP",
    text: `Your admin one-time code is ${code}. It expires in 1 minute.`,
  });
}
