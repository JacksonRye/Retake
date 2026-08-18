import { NextRequest, NextResponse } from 'next/server';

const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const workerStreamUrl = `${PIPELINE_WORKER_URL}/api/v1/jobs/${jobId}/stream`;

    const response = await fetch(workerStreamUrl, {
      headers: {
        Accept: 'text/event-stream',
      },
      cache: 'no-store',
    });

    if (!response.ok || !response.body) {
      return NextResponse.json(
        { error: `Worker returned status ${response.status}` },
        { status: response.status }
      );
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to connect to live stream' },
      { status: 500 }
    );
  }
}
