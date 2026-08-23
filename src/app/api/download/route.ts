import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { url, isDemoMode = true, duration = 60 } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Valid video URL is required.' }, { status: 400 });
    }

    const rootDir = path.join(process.cwd(), '..');
    const pythonExec = path.join(rootDir, 'venv', 'bin', 'python');
    const scriptPath = path.join(rootDir, 'backend', 'download_video.py');
    const clipDuration = isDemoMode ? duration : 0;
    const command = `"${pythonExec}" "${scriptPath}" --url "${url}" --duration ${clipDuration}`;

    console.log(`🚀 Executing URL Download: ${command}`);

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
