import nodemailer from "nodemailer";

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
const MAIL_FROM = process.env.MAIL_FROM || "no-reply@straycare.org";

export async function sendMail({ to, subject, text, html }) {
  // If SMTP configured, use it. Otherwise fall back to an Ethereal test account
  // which allows inspecting the sent email via a preview URL (dev only).
  let transporter;
  let info;

  if (MAIL_HOST && MAIL_PORT && MAIL_USER && MAIL_PASS) {
    transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      port: Number(MAIL_PORT),
      secure: Number(MAIL_PORT) === 465,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });

    info = await transporter.sendMail({
      from: MAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    console.log("sendMail sent (SMTP):", info.messageId);
    return info;
  }

  // No SMTP config — create an Ethereal test account and send the message there
  console.log("sendMail: no SMTP config found, using Ethereal test account (dev only)");
  const testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  info = await transporter.sendMail({
    from: MAIL_FROM,
    to,
    subject,
    text,
    html,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info);
  console.log("sendMail sent (Ethereal). Preview URL:", previewUrl);
  return { info, previewUrl };
}

export default sendMail;
