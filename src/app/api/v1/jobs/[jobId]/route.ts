import { NextResponse } from 'next/server';

const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 });
    }

    if (PIPELINE_WORKER_URL) {
      try {
        const workerRes = await fetch(`${PIPELINE_WORKER_URL}/api/v1/jobs/${jobId}`, {
          cache: 'no-store',
          signal: AbortSignal.timeout(4000),
        });

        if (workerRes.ok) {
          const data = await workerRes.json();
          return NextResponse.json(data);
        } else if (workerRes.status === 404) {
          return NextResponse.json({ error: 'Job not found', jobId }, { status: 404 });
        }
      } catch (err: any) {
        console.warn('Worker unreachable for job status:', err);
      }
    }

    return NextResponse.json({
      jobId,
      status: 'unknown',
      message: 'Worker not reachable'
    }, { status: 503 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
