import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

export async function GET() {
  try {
    // 1. Primary Source of Truth: Fetch live active scene table from Oracle Worker
    try {
      const workerRes = await fetch(`${PIPELINE_WORKER_URL}/api/v1/scenetable/active?t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });

      if (workerRes.ok) {
        const data = await workerRes.json();
        if (data && data.scenes && data.scenes.length > 0) {
          return NextResponse.json(data, {
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            }
          });
        }
      }
    } catch (workerFetchErr) {
      console.warn('Worker active scenetable fetch error, checking local fallback:', workerFetchErr);
    }

    // 2. Local fallback
    const sceneTablePath = path.join(process.cwd(), '..', 'backend', 'output_scene_table.json');
    if (fs.existsSync(sceneTablePath)) {
      const fileContent = fs.readFileSync(sceneTablePath, 'utf-8');
      const data = JSON.parse(fileContent);
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        }
      });
    }

    return NextResponse.json({
      style: 'CHRON_STYLE_100',
      scenes: []
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      }
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      scenes: []
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      }
    });
  }
}
