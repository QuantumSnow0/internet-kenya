import { NextRequest, NextResponse } from "next/server";
import {
  AIRTEL_MS_FORMS_INTERNAL,
  AIRTEL_MS_FORMS_QUESTION_IDS,
  normalizePhoneForMsForms,
  normalizeTownForMsForms,
  preferredPackageForMsForms,
} from "@/app/data/airtelMsForms";

const FORM_ID = process.env.MS_FORMS_FORM_ID;
const TENANT_ID = process.env.MS_FORMS_TENANT_ID;
const USER_ID = process.env.MS_FORMS_USER_ID;
const RESPONSE_PAGE_URL = process.env.MS_FORMS_RESPONSE_PAGE_URL;

type AirtelSubmitBody = {
  customerName: string;
  airtelNumber: string;
  alternateNumber: string;
  email: string;
  preferredPackage: "standard" | "premium";
  installationTown: string;
  deliveryLandmark: string;
  installationLocation: string;
  visitDate: string;
  visitTime: string;
};

function validateBody(body: unknown): { ok: true; data: AirtelSubmitBody } | { ok: false; message: string } {
  if (!body || typeof body !== "object") return { ok: false, message: "Missing body" };
  const b = body as Record<string, unknown>;
  const customerName = typeof b.customerName === "string" ? b.customerName.trim() : "";
  const airtelNumber = typeof b.airtelNumber === "string" ? b.airtelNumber.replace(/\s/g, "") : "";
  const alternateNumber = typeof b.alternateNumber === "string" ? b.alternateNumber.replace(/\s/g, "") : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const preferredPackage = typeof b.preferredPackage === "string" ? b.preferredPackage.toLowerCase() : "";
  const installationTown = typeof b.installationTown === "string" ? b.installationTown.trim() : "";
  const deliveryLandmark = typeof b.deliveryLandmark === "string" ? b.deliveryLandmark.trim() : "";
  const installationLocation = typeof b.installationLocation === "string" ? b.installationLocation.trim() : "";
  const visitDate = typeof b.visitDate === "string" ? b.visitDate.trim() : "";
  const visitTime = typeof b.visitTime === "string" ? b.visitTime.trim() : "";

  if (customerName.length < 2) return { ok: false, message: "Full names must be at least 2 characters" };
  const airtelDigits = airtelNumber.replace(/\D/g, "");
  if (airtelDigits.length < 10 || airtelDigits.length > 12) return { ok: false, message: "Airtel number must be 10–12 digits" };
  const altDigits = alternateNumber.replace(/\D/g, "");
  if (altDigits.length < 10 || altDigits.length > 12) return { ok: false, message: "Alternate number must be 10–12 digits" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "Invalid email" };
  if (preferredPackage !== "standard" && preferredPackage !== "premium") return { ok: false, message: "Invalid package" };
  if (!installationTown) return { ok: false, message: "Installation town is required" };
  if (deliveryLandmark.length < 5) return { ok: false, message: "Delivery landmark must be at least 5 characters" };
  if (!installationLocation) return { ok: false, message: "Installation location is required" };
  if (!visitDate || !/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) return { ok: false, message: "Visit date is required (YYYY-MM-DD)" };
  if (!visitTime) return { ok: false, message: "Visit time is required" };

  return {
    ok: true,
    data: {
      customerName,
      airtelNumber,
      alternateNumber,
      email,
      preferredPackage: preferredPackage as "standard" | "premium",
      installationTown,
      deliveryLandmark,
      installationLocation,
      visitDate,
      visitTime,
    },
  };
}

/** Parse token and cookies from GET response – match working project logic exactly. */
function parseTokenAndCookies(
  response: Response
): { token: string | null; cookieString: string; muid: string; userSessionId: string } {
  const setCookieHeaders = response.headers.getSetCookie?.() ?? [];
  const cookies: string[] = [];
  let requestVerificationToken: string | null = null;
  let muid = "";
  const userSessionId = response.headers.get("x-usersessionid") || "";

  for (const cookie of setCookieHeaders) {
    const cookiePair = cookie.split(";")[0];
    cookies.push(cookiePair);
    if (cookie.startsWith("__RequestVerificationToken=")) {
      requestVerificationToken = cookiePair.split("__RequestVerificationToken=")[1] ?? null;
    }
    if (cookie.startsWith("MUID=")) {
      muid = cookiePair.split("MUID=")[1] ?? "";
    }
  }

  const cookieString = cookies.join("; ");
  return { token: requestVerificationToken, cookieString, muid, userSessionId };
}

export async function POST(request: NextRequest) {
  const envOk = FORM_ID && TENANT_ID && USER_ID && RESPONSE_PAGE_URL;
  if (!envOk) {
    console.error("[Airtel MS Forms] Missing env: MS_FORMS_FORM_ID, MS_FORMS_TENANT_ID, MS_FORMS_USER_ID, MS_FORMS_RESPONSE_PAGE_URL");
    return NextResponse.json(
      { success: false, message: "Server configuration error" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 });
  }

  const validated = validateBody(body);
  if (!validated.ok) {
    return NextResponse.json({ success: false, message: validated.message }, { status: 400 });
  }
  const data = validated.data;

  const agentMobileNormalized = normalizePhoneForMsForms(AIRTEL_MS_FORMS_INTERNAL.agentMobile);
  const airtelNumberNormalized = normalizePhoneForMsForms(data.airtelNumber);
  const alternateNumberNormalized = normalizePhoneForMsForms(data.alternateNumber);
  const townNormalized = normalizeTownForMsForms(data.installationTown);
  const installationLocationFormatted = `${townNormalized} - ${data.installationLocation}`;
  const packageValue = preferredPackageForMsForms(data.preferredPackage);
  const visitTime24 = data.visitTime; // already HH:mm from input[type=time]

  console.log("============================================================");
  console.log("🗺️ LOCATION DATA BEING SENT TO MICROSOFT FORMS");
  console.log("============================================================");
  console.log("📍 Raw Location Data Received:");
  console.log("   - installationTown (raw):", data.installationTown);
  console.log("   - deliveryLandmark:", data.deliveryLandmark);
  console.log("   - installationLocation (landmark only):", data.installationLocation);
  console.log("");
  console.log("🔄 After Processing:");
  console.log("   - normalizedTown (for MS Forms):", townNormalized);
  console.log("   - final installationLocation (town - landmark):", installationLocationFormatted);
  console.log("");
  console.log("📤 What will be sent to MS Forms:");
  console.log("   - Installation Town field:", townNormalized);
  console.log("   - Delivery Landmark field:", data.deliveryLandmark);
  console.log("   - Installation Location field:", installationLocationFormatted);
  console.log("============================================================");

  const ids = AIRTEL_MS_FORMS_QUESTION_IDS;
  // optionalField ID must match working project exactly (MS Forms schema)
  const OPTIONAL_FIELD_QUESTION_ID = "r1e3b5a91acaa465b8aab76bab2cad94a";
  const answers = [
    { questionId: ids.agentType, answer1: AIRTEL_MS_FORMS_INTERNAL.agentType },
    { questionId: ids.enterpriseCP, answer1: AIRTEL_MS_FORMS_INTERNAL.enterpriseCP },
    { questionId: ids.agentName, answer1: AIRTEL_MS_FORMS_INTERNAL.agentName },
    { questionId: ids.agentMobile, answer1: agentMobileNormalized },
    { questionId: ids.leadType, answer1: AIRTEL_MS_FORMS_INTERNAL.leadType },
    { questionId: ids.totalUnitsRequired, answer1: AIRTEL_MS_FORMS_INTERNAL.totalUnitsRequired },
    { questionId: ids.connectionType, answer1: AIRTEL_MS_FORMS_INTERNAL.connectionType },
    { questionId: ids.customerName, answer1: data.customerName },
    { questionId: ids.airtelNumber, answer1: airtelNumberNormalized },
    { questionId: ids.alternateNumber, answer1: alternateNumberNormalized },
    { questionId: ids.email, answer1: data.email },
    { questionId: ids.preferredPackage, answer1: packageValue },
    { questionId: ids.visitDate, answer1: data.visitDate },
    { questionId: ids.visitTime, answer1: visitTime24 },
    { questionId: ids.deliveryLandmark, answer1: data.deliveryLandmark },
    { questionId: ids.installationTown, answer1: townNormalized },
    { questionId: ids.installationLocation, answer1: installationLocationFormatted },
    { questionId: OPTIONAL_FIELD_QUESTION_ID, answer1: null },
  ];

  let token: string | null = null;
  let cookieString = "";
  let muid = "";
  let userSessionId = "";

  try {
    const getRes = await fetch(RESPONSE_PAGE_URL, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br, zstd",
      },
    });

    if (!getRes.ok) {
      throw new Error(`Failed to fetch tokens: ${getRes.status}`);
    }

    const parsed = parseTokenAndCookies(getRes);
    token = parsed.token;
    cookieString = parsed.cookieString;
    muid = parsed.muid;
    userSessionId = parsed.userSessionId || crypto.randomUUID();

    const html = await getRes.text();
    const tokenMatch = html.match(/name="__RequestVerificationToken"\s+value="([^"]+)"/);
    if (tokenMatch) {
      token = tokenMatch[1];
    }

    if (!token) {
      console.error(
        "[Airtel MS Forms] Could not extract __RequestVerificationToken (tried cookie and HTML). Status:",
        getRes.status
      );
      return NextResponse.json(
        { success: false, message: "Could not get form token" },
        { status: 502 }
      );
    }

    console.log("✅ Microsoft Forms tokens fetched successfully:", {
      formsSessionId: cookieString.includes("FormsWebSessionId") ? "✓" : "✗",
      requestVerificationToken: token ? "✓" : "✗",
      userSessionId: userSessionId || "generated",
      userId: USER_ID,
      tenantId: TENANT_ID,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    console.error("[Airtel MS Forms] GET response page failed:", e);
    return NextResponse.json(
      { success: false, message: "Failed to load form" },
      { status: 502 }
    );
  }

  const now = new Date().toISOString();
  const formIdEncoded = encodeURIComponent(FORM_ID);
  const postUrl = `https://forms.office.com/formapi/api/${TENANT_ID}/users/${USER_ID}/forms(%27${formIdEncoded}%27)/responses`;

  const payload = {
    startDate: now,
    submitDate: now,
    answers: JSON.stringify(answers),
  };

  const bodyString = JSON.stringify(payload);
  const correlationId = crypto.randomUUID();

  const locationAnswers = [
    { name: "Delivery Landmark", id: ids.deliveryLandmark },
    { name: "Installation Town", id: ids.installationTown },
    { name: "Installation Location", id: ids.installationLocation },
  ];
  console.log("============================================================");
  console.log("📋 FINAL LOCATION VALUES IN MS FORMS PAYLOAD:");
  console.log("============================================================");
  locationAnswers.forEach(({ name, id }) => {
    const a = answers.find((x) => x.questionId === id);
    console.log(`   ${name}: "${a?.answer1 ?? ""}"`);
  });
  console.log("============================================================");
  console.log("📤 Submitting to Microsoft Forms:", {
    url: postUrl,
    correlationId,
    userSessionId,
    payloadSize: bodyString.length,
    timestamp: new Date().toISOString(),
  });
  console.log("📋 Request Body:", {
    startDate: payload.startDate,
    submitDate: payload.submitDate,
    answers,
    answersString: payload.answers,
  });
  const refererUrl = `https://forms.office.com/pages/responsepage.aspx?id=${FORM_ID}&route=shorturl`;

  const postHeaders: Record<string, string> = {
    __requestverificationtoken: token,
    accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.9",
    authorization: "",
    Connection: "keep-alive",
    "Content-Type": "application/json",
    Host: "forms.office.com",
    "odata-maxverion": "4.0",
    "odata-version": "4.0",
    Origin: "https://forms.office.com",
    Referer: refererUrl,
    "sec-ch-ua": '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    "x-correlationid": correlationId,
    "x-ms-form-muid": muid || "",
    "x-ms-form-request-ring": "business",
    "x-ms-form-request-source": "ms-formweb",
    "x-usersessionid": userSessionId,
    Cookie: cookieString,
  };

  try {
    const postRes = await fetch(postUrl, {
      method: "POST",
      headers: postHeaders,
      body: bodyString,
    });

    const postText = await postRes.text();
    if (!postRes.ok) {
      console.error("[Airtel MS Forms] POST failed:", postRes.status, postRes.statusText, postText);
      return NextResponse.json(
        { success: false, message: `Form submission failed: ${postRes.status}` },
        { status: 502 }
      );
    }

    let postJson: unknown;
    try {
      postJson = postText ? JSON.parse(postText) : {};
    } catch {
      postJson = { raw: postText };
    }
    console.log("[Airtel MS Forms] Submission succeeded:", postRes.status, postJson);
    return NextResponse.json({ success: true, message: "Submitted to MS Forms" });
  } catch (e) {
    console.error("[Airtel MS Forms] POST request failed:", e);
    return NextResponse.json(
      { success: false, message: "Network error submitting form" },
      { status: 502 }
    );
  }
}
