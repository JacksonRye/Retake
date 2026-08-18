import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const progressPath = path.join(process.cwd(), '..', 'backend', 'build_progress.json');
    
    if (!fs.existsSync(progressPath)) {
      return NextResponse.json({
        status: 'idle',
        percentage: 0,
        message: 'Ready to build timeline.'
      });
    }

    const fileContent = fs.readFileSync(progressPath, 'utf-8');
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      percentage: 0,
      message: error.message
    });
  }
}
