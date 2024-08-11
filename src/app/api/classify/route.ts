import { classifyImage } from '@/app/lib/classifier';

import { NextResponse, NextRequest } from 'next/server';

import { StreamingTextResponse } from 'ai';

// Set the runtime to edge for best performance

export const runtime = 'edge';

// add a listener to POST requests

export async function POST(request: NextRequest) {
  // read our file from request data

  const data = await request.formData();

  const file: File | null = data.get('file') as unknown as File;

  const formLocation: any = data.get('location');
  const size: any = data.get('size');
  const built: any = data.get('built');
  const description: any = data.get('description');
  const content: any = data.get('content');
  const latest: any = data.get('latest');
  const messages: any = data.get('message');
  const message = JSON.parse(messages);

  // if (!file) {
  //   return NextResponse.json(
  //     { message: 'File not present in body' },

  //     { status: 400, statusText: 'Bad Request' }
  //   );
  // }

  //call our classify function and stream to the client

  const response = await classifyImage(
    file,
    formLocation,
    size,
    built,
    description,
    content,
    message,
    latest
  );

  return new StreamingTextResponse(response);
}
