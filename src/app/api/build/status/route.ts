import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

export async function GET() {
  try {
    const progressPath = path.join(process.cwd(), '..', 'backend', 'build_progress.json');
    
    if (fs.existsSync(progressPath)) {
      const fileContent = fs.readFileSync(progressPath, 'utf-8');
      const data = JSON.parse(fileContent);
      return NextResponse.json(data, {
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' }
      });
    }

    // Cloud Serverless: fetch from Oracle VPS worker
    const workerRes = await fetch(`${PIPELINE_WORKER_URL}/api/v1/build/status?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
    });

    if (workerRes.ok) {
      const data = await workerRes.json();
      return NextResponse.json(data, {
        headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' }
      });
    }

    return NextResponse.json({
      status: 'idle',
      percentage: 0,
      current: 0,
      total: 0,
      message: 'Ready to build timeline.',
      eta_seconds: 0
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      percentage: 0,
      message: error.message,
      eta_seconds: 0
    });
  }
}
