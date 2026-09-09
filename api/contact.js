// Vercel Serverless Function — 랜딩 페이지 문의 양식 접수 → 이메일 전달 (Resend)
//
// - 키는 Vercel 환경변수 RESEND_API_KEY 로만 보관. 발신 도메인(qualy-tree.com)은 Resend에 이미 검증되어 있음(DKIM).
// - 수신: CONTACT_TO (기본 contact@qualy-tree.com). 회신은 문의자 이메일로 가도록 reply_to 설정.
// - 키가 없으면 { ok:false, error:'not_configured' } — 프론트는 직접 메일 안내로 폴백.
//
// 요청(POST): { company, name, email, phone, topic, message, lang }
// 응답: { ok:true } | { ok:false, error, message }

const RESEND_URL = "https://api.resend.com/emails";
const TO = process.env.CONTACT_TO || "contact@qualy-tree.com";
const FROM = process.env.CONTACT_FROM || "Qualytree <contact@qualy-tree.com>";

const clean = (v, max = 500) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.status(405).json({ ok: false, error: "method_not_allowed" }); return; }

  const key = process.env.RESEND_API_KEY;
  if (!key) { res.status(200).json({ ok: false, error: "not_configured" }); return; }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  const company = clean(body?.company, 120);
  const name = clean(body?.name, 80);
  const email = clean(body?.email, 160);
  const phone = clean(body?.phone, 60);
  const topic = clean(body?.topic, 80);
  const message = String(body?.message ?? "").trim().slice(0, 4000);
  const lang = clean(body?.lang, 5) || "en";
  if (body?.website) { res.status(200).json({ ok: true }); return; } // honeypot

  if (!company || !name || !email || !phone || !topic || !message) {
    res.status(400).json({ ok: false, error: "missing_fields" }); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { res.status(400).json({ ok: false, error: "bad_email" }); return; }

  const subject = `[Qualytree 문의] ${topic} — ${company} (${name})`;
  const rows = [["회사 / Company", company], ["담당자 / Name", name], ["이메일 / Email", email], ["연락처 / Phone", phone], ["유형 / Topic", topic], ["언어 / Language", lang], ["접수 / Received", new Date().toISOString()]];
  const html = `<div style="font-family:-apple-system,system-ui,sans-serif;font-size:14px;color:#111">
  <h2 style="margin:0 0 12px;font-size:16px">랜딩 페이지 문의 접수</h2>
  <table style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(k)}</td><td style="padding:4px 0"><b>${esc(v)}</b></td></tr>`).join("")}</table>
  <p style="margin:16px 0 6px;color:#666">문의 내용 / Message</p>
  <div style="white-space:pre-wrap;border:1px solid #e5e7eb;border-radius:8px;padding:12px;background:#fafafa">${esc(message)}</div>
</div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + "\n\n" + message;

  try {
    const r = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject, html, text }),
    });
    if (!r.ok) {
      const t = await r.text().catch(() => "");
      console.error("resend error", r.status, t);
      res.status(502).json({ ok: false, error: "send_failed" }); return;
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("contact error", e);
    res.status(502).json({ ok: false, error: "send_failed" });
  }
}
