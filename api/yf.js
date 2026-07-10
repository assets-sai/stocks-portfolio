// Same-origin serverless proxy for Yahoo Finance.
// The browser calls /api/yf?url=<encoded Yahoo Finance URL>; this runs on Vercel
// (no CORS) and returns the JSON. Only query*.finance.yahoo.com is allowed.
export default async function handler(req, res) {
  try {
    const raw = req.query.url;
    if (!raw) { res.status(400).json({ error: "missing url" }); return; }
    const target = decodeURIComponent(raw);
    let u;
    try { u = new URL(target); } catch { res.status(400).json({ error: "bad url" }); return; }
    if (!/^query\d+\.finance\.yahoo\.com$/.test(u.hostname)) {
      res.status(403).json({ error: "host not allowed" }); return;
    }
    const r = await fetch(u.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept": "application/json,text/plain,*/*",
      },
    });
    const body = await r.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=120");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(r.status).send(body);
  } catch (e) {
    res.status(502).json({ error: String(e && e.message || e) });
  }
}
