import { NextRequest } from 'next/server';
import { createReadStream, statSync, existsSync } from 'fs';
import { join } from 'path';
import { PassThrough } from 'stream';

/**
 * هندلر GET برای ارائه فایل صوتی به‌صورت استریم‌شده از مسیر public/sounds
 */
export async function GET(req: NextRequest) {
  // دریافت نام فایل از query string
  const filename = req.nextUrl.searchParams.get('file');

  // بررسی اعتبار نام فایل (نباید شامل مسیر یا .. باشد)
  if (!filename || filename.includes('/') || filename.includes('..')) {
    return new Response('Invalid or missing filename', { status: 400 });
  }

  // ساخت مسیر کامل فایل صوتی در فولدر public/sounds
  const filePath = join(process.cwd(), 'public/sounds', filename);

  // بررسی وجود فایل
  if (!existsSync(filePath)) {
    return new Response('File not found', { status: 404 });
  }

  // دریافت اطلاعات فایل (حجم، زمان تغییر و ...)
  const stat = statSync(filePath);

  // ایجاد stream خواندن فایل از فایل‌سیستم
  const nodeStream = createReadStream(filePath);

  // استفاده از PassThrough برای تبدیل stream نود به ReadableStream برای Web API
  const passthrough = new PassThrough();
  nodeStream.pipe(passthrough);

  // تبدیل stream به ReadableStream قابل استفاده در Response
  const readableStream = new ReadableStream({
    start(controller) {
      passthrough.on('data', (chunk) => controller.enqueue(chunk));
      passthrough.on('end', () => controller.close());
      passthrough.on('error', (err) => controller.error(err));
    },
    cancel() {
      // در صورت لغو شدن، stream اصلی را ببند
      nodeStream.destroy();
    },
  });

  // بازگشت فایل صوتی با هدرهای مناسب
  return new Response(readableStream, {
    status: 200,
    headers: {
      'Content-Type': getContentType(filename), // نوع فایل
      'Content-Length': stat.size.toString(), // طول فایل برای مرورگر
      'Content-Disposition': 'inline; filename="audio"', // نمایش درون صفحه
      'Cache-Control': 'public, max-age=31536000, immutable', // کش طولانی‌مدت
      'X-Content-Type-Options': 'nosniff', // جلوگیری از حدس نوع فایل توسط مرورگر
    },
  });
}

/**
 * تشخیص نوع محتوای فایل صوتی بر اساس پسوند
 */
function getContentType(filename: string): string {
  if (filename.endsWith('.ogg')) return 'audio/ogg';
  if (filename.endsWith('.mp3')) return 'audio/mpeg';
  if (filename.endsWith('.mp4')) return 'audio/mp4';
  if (filename.endsWith('.wav')) return 'audio/wav';
  return 'application/octet-stream'; // حالت پیش‌فرض
}
