import { NextResponse, type NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  const { email, body, subject } = await request.json();

  const transport = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    // secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },

    // tls: {
    //   // do not fail on invalid certs
    //   rejectUnauthorized: false,
    // },
  });

  const mailOptions: Mail.Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: subject ?? `Your AI property Price Report`,
    text: `${body}`,
    html: `${body}`,
  };

  try {
    const info = await transport.sendMail(mailOptions);

    console.log('the info', info);
    return NextResponse.json({ message: 'Success!', status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Failed!', status: 500, error: err });
  }
}
