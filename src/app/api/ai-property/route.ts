import {NextRequest } from 'next/server';

import { StreamingTextResponse } from 'ai';
import { PropertyClassifier } from '@/app/lib/propertyClassifier';

// Set the runtime to edge for best performance

export const runtime = 'edge';

// add a listener to POST requests

export async function POST(request: NextRequest) {
  // read our file from request data

  const data = await request.formData();
  

  const property: any = data.get('propertyFields');
  const overview: any = data.get('overview');
  const additional: any = data.get('additionalInformation');
  const energy: any = data.get('energyEfficiencyMetrics');
  const interactive: any = data.get('interactiveFloorPlans');
  const gallery: any = data.get('gallery');
  const cover: any = data.get('cover');
 
  // if (!file) {
  //   return NextResponse.json(
  //     { message: 'File not present in body' },

  //     { status: 400, statusText: 'Bad Request' }
  //   );
  // }

  //call our classify function and stream to the client

  const response = await PropertyClassifier(
   property, 
   overview, 
   additional, 
   energy, 
   interactive, 
   gallery, 
   cover
  );

  return new StreamingTextResponse(response);
}
