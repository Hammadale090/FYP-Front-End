import { OpenAI } from 'openai';

import { OpenAIStream } from 'ai';

// create a new OpenAI client using our key from earlier

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const classifyImage = async (
  file: File,
  formLocation: string,
  size: string,
  built: string,
  description: string,
  input: string,
  message: any,
  latest: string
) => {
  // encode our file as a base64 string so it can be sent in an HTTP request

  const processedMessages = await Promise.all(
    message.map(async (mess: any) => {
      if (mess?.type === 'image' && mess?.id === latest) {
        const encoded = await file
          .arrayBuffer()
          .then((buffer: any) => Buffer.from(buffer).toString('base64'));

        return {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${encoded}`,
              },
            },
          ],
        };
      } else {
        return {
          role: mess?.role,
          content: [
            {
              type: 'text',
              text: mess?.content ? mess?.content : '',
            },
          ],
        };
      }
    })
  );

  // create an OpenAI request with a prompt

  const completion = await openAi.chat.completions.create({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that gives the estimates of prices of properties through the image and prompt provided, you must give an estimate or range of estimate, you can also ask more questions to give an estimate, if the information provided is not enough you can start off with a questionnaire to get more information',
      },
      ...processedMessages,
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `${formLocation}. ${size}. .${built}, ${description}. describe the property.  given a report on the property say what your suggested price of the property might be, you must say a suggested price, there must be a suggested price, you can also very much give the range of the suggested price, there must just be a suggested price`,
          },
        ],
      },
      {
        role: 'user',

        content: [
          {
            type: 'text',
            text: input,
          },

          // {
          //   type: 'image_url',

          //   image_url: {
          //     url: `data:image/jpeg;base64,${encoded}`,
          //   },
          // },
        ],
      },
    ],

    stream: true,

    max_tokens: 1000,
  });

  // stream the response

  return OpenAIStream(completion);
};
