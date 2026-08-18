import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      jobId = `job_${Date.now()}`,
      videoUrl,
      styleCode = 'CHRON_STYLE_100',
      clipDuration = 30,
      webhookUrl,
      webhookSecret
    } = body;

    // Enforce 30s video limit for all API jobs
    const finalDuration = Math.min(30, Number(clipDuration) || 30);

    if (!videoUrl || typeof videoUrl !== 'string') {
      return NextResponse.json(
        { error: 'Valid "videoUrl" is required in request payload.' },
        { status: 400 }
      );
    }

    const workerUrl = process.env.PIPELINE_WORKER_URL;

    if (workerUrl) {
      console.log(`\n🚀 [POST /api/v1/jobs] Forwarding Job to Cloud Worker: ${workerUrl}`);
      const workerRes = await fetch(`${workerUrl}/api/v1/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          video_url: videoUrl,
          style: styleCode,
          lead_id: jobId,
          webhook_url: webhookUrl
        })
      });

      const workerData = await workerRes.json();
      return NextResponse.json({
        success: true,
        jobId: workerData.job_id || jobId,
        status: 'queued',
        worker: 'oracle-cloud',
        workerUrl: workerUrl,
        message: 'Video rendering job accepted and queued on Oracle Cloud Worker.'
      }, { status: 202 });
    }

    const rootDir = path.join(process.cwd(), '..');
    const pythonExec = path.join(rootDir, 'venv', 'bin', 'python');
    const orchestratorScript = path.join(rootDir, 'backend', 'pipeline_orchestrator.py');

    const args = [
      orchestratorScript,
      '--job-id', jobId,
      '--url', videoUrl,
      '--style', styleCode,
      '--duration', String(finalDuration),
    ];

    if (webhookUrl) {
      args.push('--webhook', webhookUrl);
    }
    if (webhookSecret) {
      args.push('--secret', webhookSecret);
    }

    console.log(`\n🚀 [POST /api/v1/jobs] Spawning Local Pipeline for Job: ${jobId}`);
    const child = spawn(pythonExec, args, {
      cwd: rootDir,
      detached: true,
      stdio: 'ignore'
    });

    child.unref();

    return NextResponse.json(
      {
        success: true,
        jobId,
        status: 'queued',
        message: 'Video rendering job accepted and queued for autonomous pipeline processing.',
        webhookConfigured: Boolean(webhookUrl),
        estimatedStages: [
          'download_and_clip',
          'transcription',
          'scene_planning',
          'code_generation',
          'timeline_assembly',
          'headless_render',
          'r2_upload',
          'completion_webhook'
        ]
      },
      { status: 202 }
    );
  } catch (error: any) {
    console.error('❌ Error processing /api/v1/jobs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
