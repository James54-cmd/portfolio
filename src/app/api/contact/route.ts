import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT ?? "587");
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM ?? user;
    const to = process.env.SMTP_TO ?? user;

    if (!host || !user || !pass || !from || !to) {
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
    const safeDate = new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [
        "New message from portfolio contact form",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="margin:0;padding:24px;background:#050505;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;color:#ececec;">
          <div style="max-width:680px;margin:0 auto;border:1px solid #153425;background:linear-gradient(180deg,#0a0a0a 0%,#080808 100%);box-shadow:0 0 0 1px rgba(0,230,122,0.08),0 24px 40px -24px rgba(0,0,0,0.9);">
            <div style="display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid #112017;background:#090909;">
              <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#ff5f57;"></span>
              <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#febc2e;"></span>
              <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#28c840;"></span>
              <span style="margin-left:8px;color:#00e67a;font-size:12px;letter-spacing:.08em;">~/portfolio — inbound_message</span>
            </div>

            <div style="padding:18px 16px 8px 16px;">
              <div style="color:#00a85c;font-size:11px;letter-spacing:.22em;text-transform:uppercase;margin-bottom:12px;">Contact Transmission</div>
              <div style="font-size:14px;color:#5fffb4;margin-bottom:12px;">New message received</div>

              <div style="border:1px solid rgba(0,230,122,0.18);background:rgba(0,230,122,0.05);padding:12px;margin-bottom:12px;">
                <div style="font-size:12px;color:#7d7d7d;margin-bottom:6px;">&gt; name:</div>
                <div style="font-size:13px;color:#e7e7e7;">${safeName}</div>
              </div>

              <div style="border:1px solid rgba(0,230,122,0.18);background:rgba(0,230,122,0.05);padding:12px;margin-bottom:12px;">
                <div style="font-size:12px;color:#7d7d7d;margin-bottom:6px;">&gt; email:</div>
                <div style="font-size:13px;color:#e7e7e7;">${safeEmail}</div>
              </div>

              <div style="border:1px solid rgba(0,230,122,0.18);background:rgba(0,230,122,0.05);padding:12px;margin-bottom:12px;">
                <div style="font-size:12px;color:#7d7d7d;margin-bottom:6px;">&gt; message:</div>
                <div style="font-size:13px;line-height:1.6;color:#e7e7e7;">${safeMessage}</div>
              </div>
            </div>

            <div style="padding:12px 16px;border-top:1px solid #112017;color:#525252;font-size:11px;">
              Received on ${safeDate}
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
