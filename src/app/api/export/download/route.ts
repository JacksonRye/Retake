import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = '/Users/gameboy/Documents/Dev Apps/Saas Video';
const MASTER_VIDEO_PATH = path.join(PROJECT_ROOT, 'remotion-project', 'out', '4k_master.mp4');

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!fs.existsSync(MASTER_VIDEO_PATH)) {
      // Fallback to input_video.mp4 if 4k_master hasn't been rendered yet
      const fallbackPath = path.join(PROJECT_ROOT, 'backend', 'input_video.mp4');
      if (!fs.existsSync(fallbackPath)) {
        return NextResponse.json({ error: 'No exported video file found on server.' }, { status: 404 });
      }
      const fileBuffer = fs.readFileSync(fallbackPath);
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Disposition': 'attachment; filename="Retake_Master_Video.mp4"',
          'Content-Length': fileBuffer.length.toString(),
        },
      });
    }

    const stat = fs.statSync(MASTER_VIDEO_PATH);
    const fileBuffer = fs.readFileSync(MASTER_VIDEO_PATH);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="Retake_4K_Master_${Date.now()}.mp4"`,
        'Content-Length': stat.size.toString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
