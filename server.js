import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import 'dotenv/config'

const app  = express()
const PORT = 3002

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'] }))
app.use(express.json())

// ── Email HTML ──────────────────────────────────────────────────────────────
function buildEmailHTML({ service, date, time, name, phone }) {
  return `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0f0;padding:40px 20px"><tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;width:100%">

<tr><td style="background:#E31E24;border-radius:16px 16px 0 0;padding:36px 44px 32px">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td><div style="font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:10px">KIENZLE KS · KOSOVO</div>
    <div style="font-size:30px;font-weight:800;color:#fff;letter-spacing:-0.6px;line-height:1.2">Neuer Termin<br>gebucht ✓</div></td>
    <td align="right" valign="top"><div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.18);text-align:center;line-height:64px;font-size:30px">📅</div></td>
  </tr></table>
</td></tr>

<tr><td style="height:4px;background:linear-gradient(90deg,#ba0013,#ff6b6e)"></td></tr>

<tr><td style="background:#fff;padding:44px">
  <p style="margin:0 0 28px;font-size:15px;color:#6e6e73;line-height:1.7">Ein neuer Termin wurde über Ihre Website angefragt. Alle Details:</p>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f8f8;border-radius:14px;overflow:hidden;margin-bottom:32px">
    <tr><td style="padding:20px 28px;border-bottom:1px solid #ebebeb">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#a1a1a6;margin-bottom:5px">🔧 &nbsp;Dienstleistung</div>
      <div style="font-size:20px;font-weight:800;color:#E31E24">${service}</div>
    </td></tr>
    <tr><td style="padding:20px 28px;border-bottom:1px solid #ebebeb">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#a1a1a6;margin-bottom:5px">📆 &nbsp;Datum</div>
      <div style="font-size:22px;font-weight:800;color:#1d1d1f">${date}</div>
    </td></tr>
    <tr><td style="padding:20px 28px;border-bottom:1px solid #ebebeb">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#a1a1a6;margin-bottom:5px">⏰ &nbsp;Uhrzeit</div>
      <div style="font-size:22px;font-weight:800;color:#1d1d1f">${time} Uhr</div>
    </td></tr>
    <tr><td style="padding:20px 28px;border-bottom:1px solid #ebebeb">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#a1a1a6;margin-bottom:5px">👤 &nbsp;Kundenname</div>
      <div style="font-size:18px;font-weight:700;color:#1d1d1f">${name}</div>
    </td></tr>
    <tr><td style="padding:20px 28px">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#a1a1a6;margin-bottom:5px">📱 &nbsp;Telefon</div>
      <div style="font-size:18px;font-weight:700;color:#E31E24">${phone}</div>
    </td></tr>
  </table>

  <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px"><tr>
    <td style="background:#fff8f8;border-left:3px solid #E31E24;border-radius:0 8px 8px 0;padding:14px 18px">
      <p style="margin:0;font-size:13px;color:#6e6e73;line-height:1.7"><strong style="color:#1d1d1f">Nächster Schritt:</strong> Kunden anrufen und Termin bestätigen.</p>
    </td>
  </tr></table>

  <table cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="background:#E31E24;border-radius:11px">
      <a href="tel:${phone.replace(/\s/g,'')}" style="display:inline-block;padding:14px 34px;color:#fff;font-size:14px;font-weight:700;text-decoration:none">Kunden anrufen →</a>
    </td>
  </tr></table>
</td></tr>

<tr><td style="background:#1d1d1f;border-radius:0 0 16px 16px;padding:28px 44px">
  <p style="margin:0 0 5px;font-size:13px;font-weight:700;color:#f5f5f7">Kienzle KS</p>
  <p style="margin:0;font-size:12px;color:#6e6e73;line-height:1.8">Trupa Inspektuese për Tahograf Kienzle &nbsp;·&nbsp; Kosovo<br>
  +383 481 135 80 &nbsp;·&nbsp; kienzle-ks.com<br>
  <span style="color:#4a4a4a">Automatisch generiert über kienzle-ks.com</span></p>
</td></tr>

</table></td></tr></table>
</body></html>`
}

// ── Booking endpoint ────────────────────────────────────────────────────────
app.post('/api/book', async (req, res) => {
  const { service, date, time, name, phone } = req.body

  if (!service || !date || !time || !name || !phone) {
    return res.status(400).json({ success: false, error: 'Fehlende Felder' })
  }

  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPass) {
    return res.status(500).json({ success: false, error: 'E-Mail nicht konfiguriert — GMAIL_APP_PASSWORD in .env fehlt' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPass },
  })

  try {
    await transporter.sendMail({
      from:    `"Kienzle KS Website" <${gmailUser}>`,
      to:      gmailUser,
      subject: `🗓 Neuer Termin: ${service} · ${date} · ${time} Uhr`,
      html:    buildEmailHTML({ service, date, time, name, phone }),
    })
    console.log(`✓ Termin gebucht: ${name} · ${service} · ${date} ${time}`)
    res.json({ success: true })
  } catch (err) {
    console.error('E-Mail Fehler:', err.message)
    res.status(500).json({ success: false, error: err.message })
  }
})

app.get('/api/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`\n  🔴 Kienzle KS API läuft auf http://localhost:${PORT}\n`)
})
