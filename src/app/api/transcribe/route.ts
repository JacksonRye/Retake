import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = util.promisify(exec);
const PROJECT_ROOT = '/Users/gameboy/Documents/Dev Apps/Saas Video';
const REMOTION_PUBLIC = path.join(PROJECT_ROOT, 'remotion-project', 'public');
const WEB_PUBLIC = path.join(PROJECT_ROOT, 'studio-web', 'public');
const TRANSCRIPT_PATH = path.join(PROJECT_ROOT, 'backend', 'output_transcript.json');

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    const videoInputPath = path.join(REMOTION_PUBLIC, 'video.mp4');

    // 1. If video file was uploaded in FormData, save it to disk
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const videoFile = formData.get('video') as File | null;
      if (videoFile) {
        console.log(`[API Transcribe] Saving new uploaded video: ${videoFile.name} (${videoFile.size} bytes)`);
        const buffer = Buffer.from(await videoFile.arrayBuffer());
        await fs.promises.writeFile(videoInputPath, buffer);
        try {
          await fs.promises.writeFile(path.join(WEB_PUBLIC, 'video.mp4'), buffer);
        } catch (e) {}
      }
    }

    const transcriberScript = path.join(PROJECT_ROOT, 'backend', 'transcriber.py');
    const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

    if (!fs.existsSync(transcriberScript)) {
      console.log(`☁️ Cloud Serverless Environment detected. Forwarding transcribe to Oracle Worker: ${PIPELINE_WORKER_URL}`);
      try {
        const workerRes = await fetch(`${PIPELINE_WORKER_URL}/api/v1/transcribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });
        if (workerRes.ok) {
          const workerData = await workerRes.json();
          return NextResponse.json(workerData);
        } else {
          const errData = await workerRes.json().catch(() => ({}));
          return NextResponse.json({ error: errData.detail || 'Cloud worker transcription failed' }, { status: 500 });
        }
      } catch (workerErr: any) {
        return NextResponse.json({ error: `Cloud worker unreachable: ${workerErr.message}` }, { status: 503 });
      }
    }

    console.log(`[API Transcribe] Executing Whisper transcriber.py on ${videoInputPath}...`);

    // 2. Run backend/transcriber.py with --input
    const command = `source venv/bin/activate && python backend/transcriber.py --input "${videoInputPath}"`;
    const { stdout, stderr } = await execPromise(command, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });

    console.log('[API Transcribe Output]:', stdout);

    // 3. Read generated output_transcript.json
    let segments = [];
    if (fs.existsSync(TRANSCRIPT_PATH)) {
      const fileData = fs.readFileSync(TRANSCRIPT_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      segments = parsed.segments || parsed;
    }

    return NextResponse.json({
      success: true,
      stdout,
      segments,
      message: 'Whisper audio extraction & transcription complete for uploaded video!'
    });
  } catch (error: any) {
    console.error('[API Transcribe Error]:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Transcription failed'
    }, { status: 500 });
  }
}
