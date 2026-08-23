import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';
import path from 'path';
import { createClient } from '@/lib/supabase/server';
import { deductCreditIfRequired } from '@/lib/credits';

const execPromise = util.promisify(exec);
const PROJECT_ROOT = '/Users/gameboy/Documents/Dev Apps/Saas Video';
const REMOTION_PUBLIC = path.join(PROJECT_ROOT, 'remotion-project', 'public');
const WEB_PUBLIC = path.join(PROJECT_ROOT, 'studio-web', 'public');
const SCENE_TABLE_PATH = path.join(PROJECT_ROOT, 'backend', 'output_scene_table.json');

export async function POST(request: Request) {
  try {
    // 1. Authenticate user & verify/deduct credit
    let user = null;
    try {
      const supabase = await createClient();
      const { data: { user: authUser } } = await supabase.auth.getUser();
      user = authUser;
    } catch (authErr) {
      // Ignored if unauthenticated or running without cookies
    }

    const creditResult = await deductCreditIfRequired(user);
    if (!creditResult.success) {
      return NextResponse.json({
        error: creditResult.message || 'Insufficient credits. Please upgrade or purchase credits.'
      }, { status: 402 });
    }

    const contentType = request.headers.get('content-type') || '';
    let style = 'CHRON_STYLE_100';
    let pacing = 'fast';
    let resolution = '9:16';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const videoFile = formData.get('video') as File | null;

      if (videoFile) {
        console.log(`[API Pipeline] Processing uploaded video: ${videoFile.name} (${videoFile.size} bytes)`);
        const buffer = Buffer.from(await videoFile.arrayBuffer());
        const remotionVideoPath = path.join(REMOTION_PUBLIC, 'video.mp4');
        const webVideoPath = path.join(WEB_PUBLIC, 'video.mp4');

        await fs.promises.writeFile(remotionVideoPath, buffer);
        try {
          await fs.promises.writeFile(webVideoPath, buffer);
        } catch (e) {
          // Ignored
        }
      }
    } else {
      const body = await request.json().catch(() => ({}));
      if (body.style) style = body.style;
      if (body.pacing) pacing = body.pacing;
      if (body.resolution) resolution = body.resolution;
    }

    const sceneScript = path.join(PROJECT_ROOT, 'backend', 'scene_generator.py');
    const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

    if (!fs.existsSync(sceneScript)) {
      console.log(`☁️ Cloud Serverless Environment detected. Forwarding pipeline generation to Oracle Worker: ${PIPELINE_WORKER_URL}`);
      try {
        const workerRes = await fetch(`${PIPELINE_WORKER_URL}/api/v1/pipeline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ style, pacing, resolution })
        });
        if (workerRes.ok) {
          const workerData = await workerRes.json();
          return NextResponse.json({
            ...workerData,
            remainingCredits: creditResult.remainingCredits
          });
        } else {
          const errData = await workerRes.json().catch(() => ({}));
          return NextResponse.json({ error: errData.detail || 'Cloud worker pipeline generation failed' }, { status: 500 });
        }
      } catch (workerErr: any) {
        return NextResponse.json({ error: `Cloud worker unreachable: ${workerErr.message}` }, { status: 503 });
      }
    }

    console.log(`[API Pipeline] Executing Autonomous Scene Generation with Style: ${style} (User: ${user?.email || 'API/Admin'})...`);

    // 2. Run Scene Table Generator (scene_generator.py using Gemini 3.7 Flash)
    console.log('[API Pipeline] Step 1: Running AI Scene Table Generator...');
    const cmdScene = `source "${PROJECT_ROOT}/venv/bin/activate" && python "${PROJECT_ROOT}/backend/scene_generator.py" --style "${style}"`;
    const resScene = await execPromise(cmdScene, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });
    console.log('[API Pipeline Scene Output]:', resScene.stdout);

    // 3. Run Component Generator (component_generator.py using Gemini 3.7 Flash to write TSX files)
    console.log('[API Pipeline] Step 2: Running AI Component Generator...');
    const cmdComponent = `source "${PROJECT_ROOT}/venv/bin/activate" && python "${PROJECT_ROOT}/backend/component_generator.py"`;
    const resComponent = await execPromise(cmdComponent, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });
    console.log('[API Pipeline Component Output]:', resComponent.stdout);

    // 4. Run Remotion Builder (remotion_builder.py to assemble FullEditPixel and Root.tsx)
    console.log('[API Pipeline] Step 3: Running Remotion Component Builder...');
    const cmdBuilder = `source "${PROJECT_ROOT}/venv/bin/activate" && python "${PROJECT_ROOT}/backend/remotion_builder.py" --style "${style}"`;
    const resBuilder = await execPromise(cmdBuilder, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });
    console.log('[API Pipeline Builder Output]:', resBuilder.stdout);

    // 5. Sync generated components to studio-web
    const copyCmd = `cp -r "${PROJECT_ROOT}/remotion-project/src/"* "${PROJECT_ROOT}/studio-web/src/remotion_components/"`;
    await execPromise(copyCmd, { shell: '/bin/zsh' });

    // 6. Read generated scene table
    let scenes = [];
    if (fs.existsSync(SCENE_TABLE_PATH)) {
      try {
        const raw = fs.readFileSync(SCENE_TABLE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        scenes = Array.isArray(parsed) ? parsed : (parsed.scenes || []);
      } catch (err) {
        console.warn('Could not parse scene_table.json:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Autonomous Scene Architecture & Remotion TSX generation complete!',
      scenes: scenes,
      remainingCredits: creditResult.remainingCredits
    });

  } catch (error: any) {
    console.error('[API Pipeline Error]:', error);
    return NextResponse.json({
      error: error.message || 'Pipeline failed during autonomous scene creation'
    }, { status: 500 });
  }
}
