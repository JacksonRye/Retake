import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = util.promisify(exec);
const PROJECT_ROOT = '/Users/gameboy/Documents/Dev Apps/Saas Video';
const SCENE_TABLE_PATH = path.join(PROJECT_ROOT, 'backend', 'output_scene_table.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { styleCode } = body;

    const chosenStyle = styleCode || 'CHRON_STYLE_72';
    console.log(`[API Scene Table] Executing scene_generator.py with styleCode: ${chosenStyle}...`);

    // Run backend/scene_generator.py with --style flag
    const command = `source venv/bin/activate && python backend/scene_generator.py --style "${chosenStyle}"`;
    const { stdout, stderr } = await execPromise(command, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });

    console.log('[API Scene Table Output]:', stdout);

    // Read output_scene_table.json
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
