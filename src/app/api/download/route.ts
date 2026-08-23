import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

export async function POST(request: Request) {
  try {
    const { url, isDemoMode = true, duration = 60, jobId, styleCode } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Valid video URL is required.' }, { status: 400 });
    }

    const rootDir = path.join(process.cwd(), '..');
    const pythonExec = path.join(rootDir, 'venv', 'bin', 'python');
    const scriptPath = path.join(rootDir, 'backend', 'download_video.py');
    const clipDuration = isDemoMode ? duration : 0;

    // Check if running on Vercel Serverless where local Python virtualenv doesn't exist
    const hasLocalPython = fs.existsSync(pythonExec) && fs.existsSync(scriptPath);

    if (!hasLocalPython) {
      console.log(`☁️ Cloud Serverless Environment detected. Forwarding download to Oracle Worker: ${PIPELINE_WORKER_URL}`);
      try {
        const workerRes = await fetch(`${PIPELINE_WORKER_URL}/api/v1/download`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, duration: clipDuration, isDemoMode, jobId, styleCode })
        });
        if (workerRes.ok) {
          const workerData = await workerRes.json();
          return NextResponse.json(workerData);
        } else {
          const errData = await workerRes.json().catch(() => ({}));
          return NextResponse.json({ error: errData.detail || 'Cloud worker download failed' }, { status: 500 });
        }
      } catch (workerErr: any) {
        return NextResponse.json({ error: `Cloud video worker unreachable: ${workerErr.message}` }, { status: 503 });
      }
    }

    // Local dev mode execution
    const command = `"${pythonExec}" "${scriptPath}" --url "${url}" --duration ${clipDuration}`;
    console.log(`🚀 Executing Local URL Download: ${command}`);

    return new Promise((resolve) => {
      exec(command, { cwd: rootDir }, (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Download failed:`, stderr || error.message);
          return resolve(NextResponse.json({ error: stderr || error.message }, { status: 500 }));
        }

        console.log(`✅ Download output:`, stdout);
        return resolve(NextResponse.json({
          success: true,
          message: `Video downloaded and trimmed to ${clipDuration}s clip successfully!`,
          duration: clipDuration
        }));
      });
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
