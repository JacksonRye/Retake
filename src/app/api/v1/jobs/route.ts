import { NextResponse } from 'next/server';

const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      jobId = `job_${Date.now()}`,
      job_id,
      leadId,
      lead_id,
      videoUrl,
      video_url,
      styleCode = 'CHRON_STYLE_100',
      style,
      clipDuration = 60,
      clip_duration,
      webhookUrl,
      webhook_url,
      webhookSecret,
      user_email,
      userEmail,
      user_id,
      userId,
    } = body;

    const finalVideoUrl = videoUrl || video_url;
    const finalJobId = jobId || job_id || leadId || lead_id || `job_${Date.now()}`;
    const finalStyle = styleCode || style || 'CHRON_STYLE_100';
    const finalWebhookUrl = webhookUrl || webhook_url;
    const finalUserEmail = userEmail || user_email;
    const finalUserId = userId || user_id;
    const finalDuration = Math.min(60, Number(clipDuration || clip_duration) || 60);

    if (!finalVideoUrl || typeof finalVideoUrl !== 'string') {
      return NextResponse.json(
        { error: 'Valid "videoUrl" is required in request payload.' },
        { status: 400 }
      );
    }

    if (PIPELINE_WORKER_URL) {
      console.log(`\n🚀 [POST /api/v1/jobs] Forwarding Job ${finalJobId} for ${finalUserEmail || 'anonymous'} to Cloud Worker: ${PIPELINE_WORKER_URL}`);
      try {
        const workerRes = await fetch(`${PIPELINE_WORKER_URL}/api/v1/jobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            video_url: finalVideoUrl,
            videoUrl: finalVideoUrl,
            style: finalStyle,
            styleCode: finalStyle,
            lead_id: finalJobId,
            leadId: finalJobId,
            job_id: finalJobId,
            jobId: finalJobId,
            webhook_url: finalWebhookUrl,
            webhookUrl: finalWebhookUrl,
            user_email: finalUserEmail,
            userEmail: finalUserEmail,
            user_id: finalUserId,
            userId: finalUserId,
            clip_duration: finalDuration,
            clipDuration: finalDuration,
          }),
        });

        if (workerRes.ok) {
          const workerData = await workerRes.json();
          return NextResponse.json(
            {
              success: true,
              jobId: workerData.job_id || finalJobId,
              status: 'queued',
              worker: 'oracle-cloud',
              workerUrl: PIPELINE_WORKER_URL,
              message: 'Video rendering job accepted and queued on Oracle Cloud Worker.',
              streamUrl: `/api/v1/jobs/${workerData.job_id || finalJobId}/stream`,
              logsUrl: `/api/v1/jobs/${workerData.job_id || finalJobId}/logs`,
            },
            { status: 202 }
          );
        }
      } catch (workerErr: any) {
        console.error('Failed to forward job to cloud worker:', workerErr);
      }
    }

    return NextResponse.json(
      {
        error: 'Cloud video worker unreachable',
        jobId: finalJobId,
      },
      { status: 503 }
    );
  } catch (error: any) {
    console.error('❌ Error processing /api/v1/jobs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await fetch(`${PIPELINE_WORKER_URL}/health`, { cache: 'no-store' });
    const health = res.ok ? await res.json() : { status: 'offline' };
    return NextResponse.json({
      status: 'active',
      service: 'Retake Video Processing API',
      version: '1.2.0',
      workerUrl: PIPELINE_WORKER_URL,
      workerHealth: health,
      dashboard: '/console',
      docs: {
        method: 'POST',
        endpoint: '/api/v1/jobs',
        headers: { 'Content-Type': 'application/json' },
        examplePayload: {
          videoUrl: 'https://www.youtube.com/shorts/EIj0WRm7zQo',
          styleCode: 'CHRON_STYLE_100',
          leadId: 'resell_lead_123',
          webhookUrl: 'https://resell-orpin.vercel.app/api/webhooks/video-studio'
        }
      }
    });
  } catch (err: any) {
    return NextResponse.json({ status: 'active', message: 'API ready for POST jobs.', error: err.message });
  }
}
