import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = util.promisify(exec);
const PROJECT_ROOT = '/Users/gameboy/Documents/Dev Apps/Saas Video';
const REMOTION_PUBLIC = path.join(PROJECT_ROOT, 'remotion-project', 'public');
const WEB_PUBLIC = path.join(PROJECT_ROOT, 'studio-web', 'public');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const videoFile = formData.get('video') as File | null;

    if (!videoFile) {
      return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
    }

    console.log(`[API Pipeline] Processing uploaded video: ${videoFile.name} (${videoFile.size} bytes)`);

    // 1. Save uploaded video to remotion-project/public/video.mp4 and studio-web/public/video.mp4
    const buffer = Buffer.from(await videoFile.arrayBuffer());
    const remotionVideoPath = path.join(REMOTION_PUBLIC, 'video.mp4');
    const webVideoPath = path.join(WEB_PUBLIC, 'video.mp4');

    await fs.promises.writeFile(remotionVideoPath, buffer);
    try {
      await fs.promises.writeFile(webVideoPath, buffer);
    } catch (e) {
      // Ignored if symlink
    }

    console.log('[API Pipeline] Saved video.mp4 successfully!');

    // 2. Run Transcriber (transcriber.py)
    console.log('[API Pipeline] Step 1: Running Whisper Transcriber...');
    const cmdTranscribe = `source venv/bin/activate && python backend/transcriber.py`;
    const resTranscribe = await execPromise(cmdTranscribe, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });
    console.log('[API Pipeline Transcribe Output]:', resTranscribe.stdout);

    // 3. Run Scene Table Generator (scene_generator.py)
    console.log('[API Pipeline] Step 2: Running AI Scene Table Generator...');
    const cmdScene = `source venv/bin/activate && python backend/scene_generator.py`;
    const resScene = await execPromise(cmdScene, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });
    console.log('[API Pipeline Scene Output]:', resScene.stdout);

    // 4. Run Remotion Builder (remotion_builder.py)
    console.log('[API Pipeline] Step 3: Running Remotion Builder...');
    const cmdBuilder = `source venv/bin/activate && python backend/remotion_builder.py`;
    const resBuilder = await execPromise(cmdBuilder, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });
    console.log('[API Pipeline Builder Output]:', resBuilder.stdout);

    // 5. Sync components to studio-web
    const copyCmd = `cp -r "${PROJECT_ROOT}/remotion-project/src/"* "${PROJECT_ROOT}/studio-web/src/remotion_components/"`;
    await execPromise(copyCmd, { shell: '/bin/zsh' });

    return NextResponse.json({
      success: true,
      message: 'Full automated video pipeline executed successfully!',
      videoName: videoFile.name,
    });
  } catch (error: any) {
    console.error('[API Pipeline Error]:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Pipeline execution failed'
    }, { status: 500 });
  }
}
