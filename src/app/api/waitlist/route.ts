import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8934320817:AAF-isSf-rMthXAOwJ-0fZ1Y0T6mvbbRj0Y';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6291627175';

async function sendTelegramWaitlistAlert(email: string, plan: string, note?: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    const text = `💎 <b>NEW COMMERCIAL WAITLIST LEAD!</b>

📧 <b>Email:</b> <code>${email}</code>
📦 <b>Requested Tier:</b> <b>${plan}</b>
${note ? `💬 <b>Note:</b> <i>${note}</i>\n` : ''}⏰ <b>Time:</b> ${new Date().toUTCString()}

<i>Ready to be contacted when Stripe checkout goes live!</i>`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    console.error('Failed to send Telegram waitlist alert:', err);
  }
}

export async function POST(request: Request) {
  try {
    const { email, plan = 'Pro ($97/mo)', note = '' } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required.' }, { status: 400 });
    }

    console.log(`[Waitlist Lead] Email: ${email}, Plan: ${plan}`);

    // Fire instant Telegram alert
    await sendTelegramWaitlistAlert(email, plan, note);

    return NextResponse.json({
      success: true,
      message: 'You have been added to the priority commercial waitlist! We will notify you when checkout opens.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
