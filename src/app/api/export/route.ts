import { spawn } from 'child_process';
import path from 'path';

const PROJECT_ROOT = '/Users/gameboy/Documents/Dev Apps/Saas Video';
const REMOTION_DIR = path.join(PROJECT_ROOT, 'remotion-project');

export async function GET(request: Request) {
  const encoder = new TextEncoder();
  let isClosed = false;

  const { searchParams } = new URL(request.url);
  const compId = searchParams.get('comp') || 'FullEditPixel';

  const stream = new ReadableStream({
    start(controller) {
      console.log(`[API Export SSE] Spawning 4K Remotion render for component: ${compId}...`);

      // Spawn npx remotion render
      const child = spawn('npx', ['remotion', 'render', compId, 'out/4k_master.mp4', '--scale', '2'], {
        cwd: REMOTION_DIR,
        shell: '/bin/zsh',
      });

      const parseOutput = (data: Buffer) => {
        if (isClosed) return;
        const text = data.toString();
        // Regex match: Rendered 345/2056, time remaining: 4m 12s
        const match = text.match(/Rendered\s+(\d+)\/(\d+)(?:,\s+time remaining:\s+([^\r\n]+))?/i);
        
        if (match) {
          const renderedFrames = parseInt(match[1], 10);
          const totalFrames = parseInt(match[2], 10);
          const timeRemaining = match[3] || 'calculating...';
          const percent = Math.floor((renderedFrames / totalFrames) * 100);

          const payload = JSON.stringify({
            status: 'rendering',
            renderedFrames,
            totalFrames,
            percent,
            timeRemaining,
          });

          try {
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
          } catch (e) {
            isClosed = true;
          }
        }
      };

      child.stdout.on('data', parseOutput);
      child.stderr.on('data', parseOutput);

      child.on('close', (code) => {
        console.log(`[API Export SSE] Render process exited with code ${code}`);
        if (!isClosed) {
          try {
            if (code === 0) {
              const payload = JSON.stringify({
                status: 'complete',
                percent: 100,
                message: '4K Master Video rendered successfully!',
                downloadUrl: '/api/export/download',
              });
              controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            } else {
              const payload = JSON.stringify({
                status: 'error',
                message: `Render failed with exit code ${code}`,
              });
              controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            }
            controller.close();
          } catch (e) {
            // Ignored
          }
          isClosed = true;
        }
      });

      child.on('error', (err) => {
        console.error('[API Export SSE Error]:', err);
        if (!isClosed) {
          try {
            const payload = JSON.stringify({
              status: 'error',
              message: err.message,
            });
            controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            controller.close();
          } catch (e) {
            // Ignored
          }
          isClosed = true;
        }
      });
    },
    cancel() {
      isClosed = true;
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

export async function POST() {
  return GET();
}
