/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const { username, voice, email } = body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'SoftSound <onboarding@resend.dev>',
      replyTo: email,
      to: ['mostafamf555@gmail.com'],
      subject: `درخواست صدای جدید از ${username}`,
      html: `
          <h1>درخواست صدای جدید</h1>
          <p>نام کاربری: ${username}</p>
          <p>صدای مورد نظر: ${voice}</p>
          <p>ایمیل: ${email}</p>
        `,
    });

    if (error) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا در ارسال ایمیل. لطفاً دوباره تلاش کنید.' }, { status: 500 });
  }
}
