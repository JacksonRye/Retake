import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '6291627175';

async function sendTelegramAlert(text: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
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
    console.error('Failed to send Telegram signup alert:', err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    
    // Handle Supabase Database Webhook (auth.users INSERT event) or direct API payload
    const record = body.record || body.new || body;
    const email = record.email || record.raw_user_meta_data?.email || 'Unknown Email';
    const fullName = record.raw_user_meta_data?.full_name || record.raw_user_meta_data?.name || record.name || 'Anonymous User';
    const provider = record.app_metadata?.provider || record.raw_app_meta_data?.provider || (record.email?.includes('gmail') ? 'google/email' : 'email');
    const userId = record.id || 'N/A';
    const createdAt = record.created_at ? new Date(record.created_at).toUTCString() : new Date().toUTCString();

    const alertMessage = `🚀 <b>NEW USER SIGNED UP ON RETAKE!</b>

👤 <b>Name:</b> ${fullName}
📧 <b>Email:</b> <code>${email}</code>
🔑 <b>Provider:</b> ${provider}
🆔 <b>User ID:</b> <code>${userId}</code>
🎁 <b>Credits:</b> 1 Free Test Credit Granted
⏰ <b>Time:</b> ${createdAt}

<i>Retake Commercial Production Monitor</i>`;

    await sendTelegramAlert(alertMessage);

    return NextResponse.json({ success: true, message: 'Signup alert dispatched.' });
  } catch (error: any) {
    console.error('Error in /api/webhooks/supabase-signup:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
