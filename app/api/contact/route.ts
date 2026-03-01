import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, message } = (await req.json()) as {
      name: string;
      phone: string;
      message: string;
    };

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Alla fält måste vara ifyllda." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Fakey Nails" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL ?? process.env.SMTP_USER,
      subject: `Ny förfrågan från ${name}`,
      text: `Namn: ${name}\nTelefon: ${phone}\nMeddelande:\n${message}`,
      html: `
        <p><strong>Namn:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Meddelande:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json(
      { error: "Kunde inte skicka meddelandet, försök igen senare." },
      { status: 500 }
    );
  }
}
