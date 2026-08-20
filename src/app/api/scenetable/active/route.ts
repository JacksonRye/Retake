import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const sceneTablePath = path.join(process.cwd(), '..', 'backend', 'output_scene_table.json');
    
    if (!fs.existsSync(sceneTablePath)) {
      return NextResponse.json({
        style: 'CHRON_STYLE_100',
        scenes: []
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        }
      });
    }

    const fileContent = fs.readFileSync(sceneTablePath, 'utf-8');
    const data = JSON.parse(fileContent);

    return NextResponse.json(data, {
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
