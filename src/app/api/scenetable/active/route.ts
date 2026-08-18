import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const sceneTablePath = path.join(process.cwd(), '..', 'backend', 'output_scene_table.json');
    
    if (!fs.existsSync(sceneTablePath)) {
      return NextResponse.json({
        style: 'CHRON_STYLE_12',
        scenes: []
      });
    }

    const fileContent = fs.readFileSync(sceneTablePath, 'utf-8');
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      scenes: []
    });
  }
}
