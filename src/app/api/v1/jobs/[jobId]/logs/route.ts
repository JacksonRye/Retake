import { NextRequest, NextResponse } from 'next/server';

const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const workerLogsUrl = `${PIPELINE_WORKER_URL}/api/v1/jobs/${jobId}/logs`;

    const response = await fetch(workerLogsUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(4000),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({ jobId, totalLines: 0, logs: [] });
  } catch (error: any) {
    return NextResponse.json({ jobId: '', totalLines: 0, logs: [] });
  }
}
