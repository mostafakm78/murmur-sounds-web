/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const { username, title, email, description } = body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'SoftSound <onboarding@resend.dev>',
      replyTo: email,
      to: ['mostafamf555@gmail.com'],
      subject: `درخواست صدای جدید از ${username}`,
      html: `
          <h1>عنوان : ${title}</h1>
          <p>نام کاربری: ${username}</p>
          <p>توضیحات: ${description}</p>
          <p>ایمیل: ${email}</p>
        `,
    });

    if (error) {
      return NextResponse.json({ success: false, data: error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'خطا در ارسال ایمیل. لطفاً دوباره تلاش کنید.' }, { status: 500 });
  }
}
