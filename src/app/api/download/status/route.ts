import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const progressPath = path.join(process.cwd(), '..', 'backend', 'download_progress.json');

    if (!fs.existsSync(progressPath)) {
      return NextResponse.json({
        status: 'idle',
        percent: 0,
        downloaded_str: '',
        speed_str: '',
        eta_str: ''
      });
    }

    const fileContent = fs.readFileSync(progressPath, 'utf-8');
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({
      status: 'idle',
      percent: 0,
      downloaded_str: '',
      speed_str: '',
      eta_str: ''
    });
  }
}
