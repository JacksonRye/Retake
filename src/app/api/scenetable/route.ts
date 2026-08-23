import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = util.promisify(exec);
const PROJECT_ROOT = '/Users/gameboy/Documents/Dev Apps/Saas Video';
const SCENE_TABLE_PATH = path.join(PROJECT_ROOT, 'backend', 'output_scene_table.json');
const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const chosenStyle = body.styleCode || body.style || 'CHRON_STYLE_100';

    const sceneScript = path.join(PROJECT_ROOT, 'backend', 'scene_generator.py');
    if (!fs.existsSync(sceneScript)) {
      console.log(`☁️ Cloud Serverless Environment detected. Forwarding scenetable to Oracle Worker: ${PIPELINE_WORKER_URL}`);
      try {
        const workerRes = await fetch(`${PIPELINE_WORKER_URL}/api/v1/scenetable`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ styleCode: chosenStyle })
        });
        if (workerRes.ok) {
          const workerData = await workerRes.json();
          return NextResponse.json(workerData);
        } else {
          const errData = await workerRes.json().catch(() => ({}));
          return NextResponse.json({ error: errData.detail || 'Cloud worker scene table generation failed' }, { status: 500 });
        }
      } catch (workerErr: any) {
        return NextResponse.json({ error: `Cloud worker unreachable: ${workerErr.message}` }, { status: 503 });
      }
    }

    console.log(`[API Scene Table] Executing scene_generator.py with styleCode: ${chosenStyle}...`);
    const command = `source venv/bin/activate && python backend/scene_generator.py --style "${chosenStyle}"`;
    const { stdout, stderr } = await execPromise(command, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });

    console.log('[API Scene Table Output]:', stdout);

    let scenes = [];
    if (fs.existsSync(SCENE_TABLE_PATH)) {
      const fileData = fs.readFileSync(SCENE_TABLE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      scenes = parsed.scenes || parsed;
    }

    return NextResponse.json({
      success: true,
      stdout,
      scenes,
      message: `AI Scene Table generated successfully for ${chosenStyle}!`
    });
  } catch (error: any) {
    console.error('[API Scene Table Error]:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Scene table generation failed'
    }, { status: 500 });
  }
}
