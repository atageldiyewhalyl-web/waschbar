import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  location?: string;
  consentEmail?: boolean;
  consentEmailMarketing?: boolean;
  consentMarketing?: boolean;
  pageUrl?: string;
};

const defaultFromEmail = "Waschbar Anfrage <anfrage@forms.xn--nll-hoa.com>";
const consentFormVersion = "sb-wasch-abo-v1";
const voucherConsentText =
  "Ich möchte Informationen zum SB-Wasch-Abo erhalten und bin einverstanden, dass Waschbar mich dazu kontaktiert.";
const campaignMeasurementConsentText =
  "Ich bin einverstanden, dass meine Daten zur Kampagnenmessung an Google/Meta übermittelt werden.";
const emailMarketingConsentText =
  "Ich möchte regelmäßig per E-Mail Angebote, Erinnerungen und Aktionen von Waschbar erhalten. Ich kann mich jederzeit über den Abmeldelink in jeder E-Mail abmelden.";

function cleanText(value: unknown, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function validatePayload(payload: LeadPayload) {
  const lead = {
    firstName: cleanText(payload.firstName, 100),
    lastName: cleanText(payload.lastName, 100),
    email: cleanText(payload.email, 254).toLowerCase(),
    phone: cleanText(payload.phone, 40),
    street: cleanText(payload.street, 150),
    postalCode: cleanText(payload.postalCode, 20),
    city: cleanText(payload.city, 100),
    location: cleanText(payload.location, 50),
    consentEmail: payload.consentEmail === true,
    consentEmailMarketing: payload.consentEmailMarketing === true,
    consentMarketing: payload.consentMarketing === true,
    pageUrl: cleanText(payload.pageUrl, 500),
  };

  if (
    !lead.firstName ||
    !lead.lastName ||
    !lead.email ||
    !lead.phone ||
    !lead.street ||
    !lead.postalCode ||
    !lead.city ||
    !lead.location ||
    !lead.consentEmail
  ) {
    throw new Error("Missing required lead fields.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    throw new Error("Invalid email address.");
  }

  return lead;
}

function renderTextEmail(lead: ReturnType<typeof validatePayload>) {
  return [
    "Neue Waschbar SB-Wasch-Abo Anfrage",
    "",
    `Name: ${lead.firstName} ${lead.lastName}`,
    `E-Mail: ${lead.email}`,
    `Telefon: ${lead.phone}`,
    `Adresse: ${lead.street}, ${lead.postalCode} ${lead.city}`,
    `Standort: ${lead.location}`,
    `E-Mail-Marketing-Einwilligung: ${lead.consentEmailMarketing ? "Ja" : "Nein"}`,
    `Kampagnenmessung-Einwilligung: ${lead.consentMarketing ? "Ja" : "Nein"}`,
    `Seite: ${lead.pageUrl || "-"}`,
  ].join("\n");
}

function renderHtmlEmail(lead: ReturnType<typeof validatePayload>) {
  const rows = [
    ["Name", `${lead.firstName} ${lead.lastName}`],
    ["E-Mail", lead.email],
    ["Telefon", lead.phone],
    ["Adresse", `${lead.street}, ${lead.postalCode} ${lead.city}`],
    ["Standort", lead.location],
    ["E-Mail-Marketing-Einwilligung", lead.consentEmailMarketing ? "Ja" : "Nein"],
    ["Kampagnenmessung-Einwilligung", lead.consentMarketing ? "Ja" : "Nein"],
    ["Seite", lead.pageUrl || "-"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#071b49;line-height:1.5">
      <h1 style="font-size:22px;margin:0 0 16px">Neue Waschbar SB-Wasch-Abo Anfrage</h1>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
            <tr>
              <td style="border:1px solid #dce6f4;padding:10px;font-weight:700;background:#f8fbff;width:190px">${escapeHtml(label)}</td>
              <td style="border:1px solid #dce6f4;padding:10px">${escapeHtml(value)}</td>
            </tr>
          `,
          )
          .join("")}
      </table>
    </div>
  `;
}

function parseEmailList(value: string) {
  return value
    .split(",")
    .map((email) => email.trim())
    .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "";
  return request.headers.get("x-real-ip")?.trim() || "";
}

function hashIpAddress(ipAddress: string) {
  if (!ipAddress) return "";
  return createHash("sha256")
    .update(`${ipAddress}:${process.env.CONSENT_IP_HASH_SALT || ""}`)
    .digest("hex");
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  if (typeof error === "string" && error.trim()) return error;
  return "Unknown error";
}

function isSchemaColumnError(error: unknown) {
  const message = getErrorMessage(error).toLowerCase();
  return message.includes("column") && message.includes("waschbar_leads");
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !serviceRoleKey || !resendApiKey) {
      throw new Error("Missing required server secrets.");
    }

    const payload = (await request.json()) as LeadPayload;
    const lead = validatePayload(payload);
    const consentTimestamp = new Date().toISOString();
    const submittedUserAgent = cleanText(request.headers.get("user-agent"), 500);
    const submittedIpHash = hashIpAddress(getClientIp(request));

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const fullLeadInsert = {
      first_name: lead.firstName,
      last_name: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      street: lead.street,
      postal_code: lead.postalCode,
      city: lead.city,
      location: lead.location,
      consent_voucher: lead.consentEmail,
      consent_voucher_at: consentTimestamp,
      consent_voucher_text: voucherConsentText,
      consent_email_marketing: lead.consentEmailMarketing,
      consent_email_marketing_at: lead.consentEmailMarketing
        ? consentTimestamp
        : null,
      consent_email_marketing_text: lead.consentEmailMarketing
        ? emailMarketingConsentText
        : null,
      consent_marketing: lead.consentMarketing,
      consent_marketing_at: lead.consentMarketing ? consentTimestamp : null,
      consent_marketing_text: lead.consentMarketing
        ? campaignMeasurementConsentText
        : null,
      consent_form_version: consentFormVersion,
      submitted_user_agent: submittedUserAgent,
      submitted_ip_hash: submittedIpHash || null,
      page_url: lead.pageUrl,
    };

    const legacyLeadInsert = {
      first_name: lead.firstName,
      last_name: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      street: lead.street,
      postal_code: lead.postalCode,
      city: lead.city,
      location: lead.location,
      consent_marketing: lead.consentMarketing,
      page_url: lead.pageUrl,
    };

    let { data, error } = await supabase
      .from("waschbar_leads")
      .insert(fullLeadInsert)
      .select("id")
      .single();

    if (error && isSchemaColumnError(error)) {
      const legacyResult = await supabase
        .from("waschbar_leads")
        .insert(legacyLeadInsert)
        .select("id")
        .single();

      data = legacyResult.data;
      error = legacyResult.error;
    }

    if (error) throw error;

    const leadId = data.id as string;
    const from = process.env.LEAD_FROM_EMAIL || defaultFromEmail;
    const to = parseEmailList(process.env.LEAD_TO_EMAIL || "");

    if (!to.length) {
      throw new Error("No lead recipient configured.");
    }

    const subject = `Neue SB-Wasch-Abo Anfrage: ${lead.firstName} ${lead.lastName} (${lead.location})`;
    const html = renderHtmlEmail(lead);
    const text = renderTextEmail(lead);
    const failedDeliveries: string[] = [];

    for (const recipient of to) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to: recipient, subject, html, text }),
      });

      if (!emailResponse.ok) {
        const emailError = await emailResponse.text();
        failedDeliveries.push(`${recipient}: ${emailError.slice(0, 500)}`);
      }
    }

    if (failedDeliveries.length) {
      await supabase
        .from("waschbar_leads")
        .update({
          status: "email_failed",
          email_error: failedDeliveries.join("\n").slice(0, 1000),
        })
        .eq("id", leadId);

      return NextResponse.json(
        { ok: false, error: "Email delivery failed" },
        { status: 502 },
      );
    }

    await supabase
      .from("waschbar_leads")
      .update({
        status: "email_sent",
        email_sent_at: new Date().toISOString(),
        email_error: null,
      })
      .eq("id", leadId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = getErrorMessage(error);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
