import { OpenAI } from 'openai';

import { OpenAIStream } from 'ai';

// create a new OpenAI client using our key from earlier

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const PropertyClassifier = async (
  property: string,
  overview: string,
  additional: string,
  energy: string,
  interactive: string,
  gallery: string,
  cover: string
) => {
  // encode our file as a base64 string so it can be sent in an HTTP request

  // create an OpenAI request with a prompt

  const completion = await openAi.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that gives compelling property descriptions, highlighting key features and amenities to capture the attention of potential buyers',
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `.Property : ${property} Overview : ${overview} Additional details :${additional}  Real-time energy metrics : ${energy} interactive floor plans :${interactive} , the gallery url if there is ${gallery}, the cover photo url if thgere is ${cover} Give an enhanced description of the property using all the information you can get from the data included `,
          },
        ],
      },
    ],

    stream: true,

    max_tokens: 1000,
  });

  // stream the response

  return OpenAIStream(completion);
};
