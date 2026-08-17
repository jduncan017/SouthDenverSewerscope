import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/*
 * Lead intake for the contact form.
 *
 * Delivery is via Resend's REST API, called with plain fetch so the project
 * does not carry an SDK for one request. Configure:
 *   RESEND_API_KEY   - from resend.com
 *   LEAD_TO_EMAIL    - where leads land (defaults to the site contact address)
 *   LEAD_FROM_EMAIL  - a verified sender on the Resend domain
 *
 * >>> IF RESEND IS NOT CONFIGURED, LEADS ARE ONLY WRITTEN TO THE SERVER LOG. <<<
 * The request still returns success, because failing a real customer's form is
 * worse than a recoverable log line, and the confirmation message always shows
 * the phone number as a second path. But this MUST be configured before the
 * first ad campaign runs, or paid leads will exist only in the platform logs.
 */

const MAX_LEN = 4000;

interface LeadPayload {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  city?: unknown;
  service?: unknown;
  message?: unknown;
  company?: unknown; // honeypot
  source?: unknown; // captured query string (UTMs, gclid)
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_LEN) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real person never sees this field. Return success so the bot
  // has nothing to learn from the response, but send nothing.
  if (asString(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    name: asString(body.name),
    phone: asString(body.phone),
    email: asString(body.email),
    city: asString(body.city),
    service: asString(body.service),
    message: asString(body.message),
    source: asString(body.source),
  };

  // Server side validation mirrors the client's, because the client's can be
  // skipped entirely by anything that is not a browser.
  const missing: string[] = [];
  if (!lead.name) missing.push("name");
  if (!lead.phone) missing.push("phone");
  if (!lead.email || !EMAIL_RE.test(lead.email)) missing.push("email");
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing or invalid: ${missing.join(", ")}.` },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL ?? site.contact.email;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      "[LEAD:UNDELIVERED] Resend is not configured, so this lead was not emailed. Set RESEND_API_KEY and LEAD_FROM_EMAIL.",
      JSON.stringify(lead),
    );
    return NextResponse.json({ ok: true });
  }

  const lines = [
    `Name:    ${lead.name}`,
    `Phone:   ${lead.phone}`,
    `Email:   ${lead.email}`,
    lead.city ? `City:    ${lead.city}` : "",
    lead.service ? `Service: ${lead.service}` : "",
    "",
    lead.message || "(no message)",
    "",
    lead.source ? `Ad tracking: ${lead.source}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `New ${site.shortName} lead: ${lead.name}${lead.city ? ` (${lead.city})` : ""}`,
        text: lines,
      }),
    });

    if (!response.ok) {
      // Log the lead alongside the failure so it is recoverable from the
      // platform logs even when the mail provider is down.
      console.error(
        "[LEAD:UNDELIVERED] Resend rejected the send.",
        response.status,
        await response.text(),
        JSON.stringify(lead),
      );
      return NextResponse.json(
        { error: "We could not send that. Please call us instead." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error(
      "[LEAD:UNDELIVERED] Network failure sending the lead.",
      error,
      JSON.stringify(lead),
    );
    return NextResponse.json(
      { error: "We could not send that. Please call us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
