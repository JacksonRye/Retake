import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = util.promisify(exec);
const PROJECT_ROOT = '/Users/gameboy/Documents/Dev Apps/Saas Video';

export async function POST(request: Request) {
  try {
    console.log('[API Build] Step 1: Executing parallel component_generator.py...');
    const cmdCodeGen = `source venv/bin/activate && python backend/component_generator.py`;
    const resCodeGen = await execPromise(cmdCodeGen, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });
    console.log('[API Build CodeGen Output]:', resCodeGen.stdout);

    console.log('[API Build] Step 2: Executing remotion_builder.py...');
    const cmdBuilder = `source venv/bin/activate && python backend/remotion_builder.py`;
    const resBuilder = await execPromise(cmdBuilder, { cwd: PROJECT_ROOT, shell: '/bin/zsh' });
    console.log('[API Build Builder Output]:', resBuilder.stdout);

    console.log('[API Build] Step 3: Syncing generated TSX components to studio-web...');
    const copyCmd = `cp -r "${PROJECT_ROOT}/remotion-project/src/"* "${PROJECT_ROOT}/studio-web/src/remotion_components/"`;
    await execPromise(copyCmd, { shell: '/bin/zsh' });

    return NextResponse.json({
      success: true,
      message: 'Pure AI TSX Components & Remotion Master Timeline built successfully!'
    });
  } catch (error: any) {
    console.error('[API Build Error]:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Timeline build failed'
    }, { status: 500 });
  }
}
