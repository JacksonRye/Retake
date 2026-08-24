import { NextResponse, type NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

export async function GET(request: NextRequest) {
  try {
    const localVideo = path.join(process.cwd(), '..', 'backend', 'input_video.mp4');
    
    // 1. Local environment check
    if (fs.existsSync(localVideo)) {
      const stat = fs.statSync(localVideo);
      const fileSize = stat.size;
      const range = request.headers.get('range');

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const fileStream = fs.createReadStream(localVideo, { start, end });

        // Convert Node stream to Web ReadableStream
        const stream = new ReadableStream({
          start(controller) {
            fileStream.on('data', (chunk) => controller.enqueue(chunk));
            fileStream.on('end', () => controller.close());
            fileStream.on('error', (err) => controller.error(err));
          },
        });

        return new Response(stream, {
          status: 206,
          headers: {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': `${chunksize}`,
            'Content-Type': 'video/mp4',
          },
        });
      } else {
        const fileStream = fs.createReadStream(localVideo);
        const stream = new ReadableStream({
          start(controller) {
            fileStream.on('data', (chunk) => controller.enqueue(chunk));
            fileStream.on('end', () => controller.close());
            fileStream.on('error', (err) => controller.error(err));
          },
        });

        return new Response(stream, {
          headers: {
            'Content-Length': `${fileSize}`,
            'Content-Type': 'video/mp4',
            'Accept-Ranges': 'bytes',
          },
        });
      }
    }

    // 2. Cloud Serverless: Forward request with range header to Oracle VPS worker
    const headers: Record<string, string> = {};
    const rangeHeader = request.headers.get('range');
    if (rangeHeader) {
      headers['range'] = rangeHeader;
    }

    const workerRes = await fetch(`${PIPELINE_WORKER_URL}/api/v1/video/stream`, {
      headers,
    });

    if (!workerRes.ok && workerRes.status !== 206) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'video/mp4');
    responseHeaders.set('Accept-Ranges', 'bytes');
    if (workerRes.headers.get('content-range')) {
      responseHeaders.set('Content-Range', workerRes.headers.get('content-range')!);
    }
    if (workerRes.headers.get('content-length')) {
      responseHeaders.set('Content-Length', workerRes.headers.get('content-length')!);
    }

    return new Response(workerRes.body, {
      status: workerRes.status,
      headers: responseHeaders,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
