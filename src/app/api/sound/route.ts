import { NextRequest } from 'next/server';
import { createReadStream, statSync, existsSync } from 'fs';
import { join } from 'path';
import { PassThrough } from 'stream';

export async function GET(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get('file');
  if (!filename || filename.includes('/') || filename.includes('..')) {
    return new Response('Invalid or missing filename', { status: 400 });
  }

  const filePath = join(process.cwd(), 'public/sounds', filename);

  if (!existsSync(filePath)) {
    return new Response('File not found', { status: 404 });
  }

  const stat = statSync(filePath);
  const nodeStream = createReadStream(filePath);
  const passthrough = new PassThrough();
  nodeStream.pipe(passthrough);

  const readableStream = new ReadableStream({
    start(controller) {
      passthrough.on('data', (chunk) => controller.enqueue(chunk));
      passthrough.on('end', () => controller.close());
      passthrough.on('error', (err) => controller.error(err));
    },
    cancel() {
      nodeStream.destroy();
    },
  });

  return new Response(readableStream, {
    status: 200,
    headers: {
      'Content-Type': getContentType(filename),
      'Content-Length': stat.size.toString(),
      'Content-Disposition': 'inline; filename="audio"',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function getContentType(filename: string): string {
  if (filename.endsWith('.ogg')) return 'audio/ogg';
  if (filename.endsWith('.mp3')) return 'audio/mpeg';
  if (filename.endsWith('.mp4')) return 'audio/mp4';
  return 'application/octet-stream';
}
