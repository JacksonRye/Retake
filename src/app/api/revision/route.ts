import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = util.promisify(exec);
const PROJECT_ROOT = '/Users/gameboy/Documents/Dev Apps/Saas Video';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { scene, prompt } = body;

    if (!scene || !prompt) {
      return NextResponse.json({ error: 'Missing scene or prompt parameters' }, { status: 400 });
    }

    console.log(`[API Revision] Targeting Scene ${scene} with prompt: "${prompt}"`);

    // 1. Execute backend/revision_engine.py
    const command = `source venv/bin/activate && python backend/revision_engine.py --scene ${scene} --prompt "${prompt.replace(/"/g, '\\"')}"`;
    const { stdout, stderr } = await execPromise(command, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });

    console.log('[API Revision Output]:', stdout);

    // 2. Sync generated components into studio-web/src/remotion_components
    const copyCmd = `cp -r "${PROJECT_ROOT}/remotion-project/src/"* "${PROJECT_ROOT}/studio-web/src/remotion_components/"`;
    await execPromise(copyCmd, { shell: '/bin/zsh' });

    // 3. Extract Composition ID from stdout (e.g. Studio Composition ID: [Scene2-V8])
    const match = stdout.match(/Studio Composition ID: \[([^\]]+)\]/);
    const newCompId = match ? match[1] : `Scene${scene}`;

    return NextResponse.json({
      success: true,
      scene,
      prompt,
      newCompId,
      stdout,
      message: `Revision applied successfully! New version: ${newCompId}`
    });
  } catch (error: any) {
    console.error('[API Revision Error]:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to process revision'
    }, { status: 500 });
  }
}
