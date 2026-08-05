import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.1";

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

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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

function renderCustomerConfirmationText(lead: ReturnType<typeof validatePayload>) {
  return [
    `Hallo ${lead.firstName} ${lead.lastName},`,
    "",
    "hiermit bestätigen wir den Eingang deiner Anfrage für das Abo in unserem Waschsalon in Heidelberg. Wir senden dir per Mail den Abovertrag sowie das SEPA-Lastschriftmandat. Wir bitten dich, diese zu unterzeichnen und per Mail an abo@waschbar.eu zurückzusenden. Anschließend erhältst du postalisch unsere Mitgliedskarte, womit du monatlich 10x waschen und 10x trocknen kannst.",
    "",
    "Für Fragen stehen wir dir jederzeit per Mail (abo@waschbar.eu) als auch unter 0176/20772290 zur Verfügung.",
    "",
    "Viele Grüße",
    "",
    "Waschbar Heidelberg GmbH",
  ].join("\n");
}

function renderCustomerConfirmationHtml(lead: ReturnType<typeof validatePayload>) {
  return `
    <div style="font-family:Arial,sans-serif;color:#071b49;line-height:1.6;font-size:16px;max-width:680px">
      <p>Hallo ${escapeHtml(`${lead.firstName} ${lead.lastName}`)},</p>
      <p>
        hiermit bestätigen wir den Eingang deiner Anfrage für das Abo in unserem Waschsalon in Heidelberg.
        Wir senden dir per Mail den Abovertrag sowie das SEPA-Lastschriftmandat. Wir bitten dich, diese zu
        unterzeichnen und per Mail an <a href="mailto:abo@waschbar.eu" style="color:#2f74ff;font-weight:700">abo@waschbar.eu</a>
        zurückzusenden. Anschließend erhältst du postalisch unsere Mitgliedskarte, womit du monatlich
        10x waschen und 10x trocknen kannst.
      </p>
      <p>
        Für Fragen stehen wir dir jederzeit per Mail
        (<a href="mailto:abo@waschbar.eu" style="color:#2f74ff;font-weight:700">abo@waschbar.eu</a>)
        als auch unter <a href="tel:+4917620772290" style="color:#2f74ff;font-weight:700">0176/20772290</a> zur Verfügung.
      </p>
      <p>
        Viele Grüße<br>
        Waschbar Heidelberg GmbH
      </p>
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

async function hashIpAddress(ipAddress: string) {
  if (!ipAddress) return "";
  const salt = Deno.env.get("CONSENT_IP_HASH_SALT") || "";
  const encoded = new TextEncoder().encode(`${ipAddress}:${salt}`);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
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

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return Response.json(
      { ok: false, error: "Method not allowed" },
      { status: 405, headers: corsHeaders },
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!supabaseUrl || !serviceRoleKey || !resendApiKey) {
      throw new Error("Missing required server secrets.");
    }

    const payload = (await request.json()) as LeadPayload;
    const lead = validatePayload(payload);
    const consentTimestamp = new Date().toISOString();
    const submittedUserAgent = cleanText(request.headers.get("user-agent"), 500);
    const submittedIpHash = await hashIpAddress(getClientIp(request));

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
    if (!data) {
      throw new Error("Lead insert did not return an id.");
    }

    const leadId = data.id as string;
    const from = Deno.env.get("LEAD_FROM_EMAIL") || defaultFromEmail;
    const to = parseEmailList(Deno.env.get("LEAD_TO_EMAIL") || "");

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

    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: lead.email,
        subject: "Bestätigung deiner SB-Wasch-Abo Anfrage",
        html: renderCustomerConfirmationHtml(lead),
        text: renderCustomerConfirmationText(lead),
        reply_to: "abo@waschbar.eu",
      }),
    });

    if (!customerEmailResponse.ok) {
      const emailError = await customerEmailResponse.text();
      failedDeliveries.push(`${lead.email}: ${emailError.slice(0, 500)}`);
    }

    if (failedDeliveries.length) {
      await supabase
        .from("waschbar_leads")
        .update({
          status: "email_failed",
          email_error: failedDeliveries.join("\n").slice(0, 1000),
        })
        .eq("id", leadId);

      return Response.json(
        { ok: false, error: "Email delivery failed" },
        { status: 502, headers: corsHeaders },
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

    return Response.json({ ok: true }, { headers: corsHeaders });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error("Voucher lead submission failed:", message);
    return Response.json({ ok: false, error: message }, { status: 400, headers: corsHeaders });
  }
});
