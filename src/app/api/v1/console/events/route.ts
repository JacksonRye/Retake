import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PIPELINE_WORKER_URL = process.env.PIPELINE_WORKER_URL || 'http://132.145.72.176:8000';

export async function GET() {
  try {
    if (PIPELINE_WORKER_URL) {
      try {
        const res = await fetch(`${PIPELINE_WORKER_URL}/api/v1/console/events`, {
          cache: 'no-store',
          signal: AbortSignal.timeout(3500),
        });
        if (res.ok) {
          const cloudData = await res.json();
          return NextResponse.json(cloudData);
        }
      } catch (cloudErr) {
        console.warn('Worker unreachable, falling back to local storage:', cloudErr);
      }
    }

    // Local fallback
    const rootDir = path.join(process.cwd(), '..');
    const logPath = path.join(rootDir, 'backend', 'events_log.json');

    if (!fs.existsSync(logPath)) {
      return NextResponse.json({
        jobs: [],
        webhooks: [],
        stats: {
          totalJobs: 0,
          completedJobs: 0,
          activeJobs: 0,
          failedJobs: 0,
          totalWebhooks: 0,
        },
      });
    }

    const fileContent = fs.readFileSync(logPath, 'utf-8');
    const data = JSON.parse(fileContent || '{"jobs":[], "webhooks":[]}');

    const jobs = data.jobs || [];
    const webhooks = data.webhooks || [];

    const stats = {
      totalJobs: jobs.length,
      completedJobs: jobs.filter((j: any) => j.status === 'completed').length,
      activeJobs: jobs.filter((j: any) => j.status === 'processing' || j.status === 'queued').length,
      failedJobs: jobs.filter((j: any) => j.status === 'failed').length,
      totalWebhooks: webhooks.length,
      successfulWebhooks: webhooks.filter((w: any) => w.success).length,
    };

    return NextResponse.json({
      jobs: jobs.reverse(),
      webhooks: webhooks.reverse(),
      stats,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to read console events' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    if (PIPELINE_WORKER_URL) {
      try {
        const res = await fetch(`${PIPELINE_WORKER_URL}/api/v1/console/events`, {
          method: 'DELETE',
          signal: AbortSignal.timeout(3500),
        });
        if (res.ok) {
          const cloudData = await res.json();
          return NextResponse.json(cloudData);
        }
      } catch (cloudErr) {
        console.warn('Worker unreachable for DELETE, falling back to local:', cloudErr);
      }
    }

    try {
      const rootDir = path.join(process.cwd(), '..');
      const logPath = path.join(rootDir, 'backend', 'events_log.json');
      if (fs.existsSync(path.dirname(logPath))) {
        fs.writeFileSync(logPath, JSON.stringify({ jobs: [], webhooks: [] }, null, 2), 'utf-8');
      }
    } catch (fsErr) {
      // Ignore on read-only serverless filesystem
    }

    return NextResponse.json({
      success: true,
      message: 'Console queue and webhook logs cleared successfully.'
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to clear console events' },
      { status: 500 }
    );
  }
}
