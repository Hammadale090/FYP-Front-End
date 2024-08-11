import { OpenAI } from "@langchain/openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  //   temperature: 0.7,
  //   modelName: "gpt-3.5-turbo", // Using a more recent model
});

/**
 * Process articles and generate summaries
 * @param {Array} articles - Array of article objects
 * @param {string} location - Location name
 * @returns {Promise<Array>} - Array of article summaries
 */
export const processArticles = async (articles, location) => {
  try {
    // Use Promise.all for concurrent API calls
    const summaries = await Promise.all(
      articles.map(async (article) => {
        const prompt = `Summarize the following article about safety in ${location}:\n\n${article.snippet}`;

        const response = await openai.invoke(prompt);
        return response.trim();
      })
    );
    // console.log("********** summeries ********* ", summaries);
    return summaries;
  } catch (error) {
    console.error("Error processing articles:", error);
    throw error; // Re-throw to allow caller to handle
  }
};

//-------------------------------
export const getSafetyScoreFromAI = async (summaries, location) => {
  try {
    const prompt = `
  Based on the following summaries of articles and your prior knowledge, provide a safety score for ${location} on a scale from 1 to 10.
  
  Your response must be always in this format
  {safety_score:6}


  Summaries:
  ${summaries.join("\n\n")}
  `;

    const response = await openai.invoke(prompt);

    const lines = response.trim().split("\n");
    const scoreLine = lines.find((line) => line.match(/safety_score:/i));
    const score = scoreLine ? parseFloat(scoreLine.split(":")[1].trim()) : null;

    return {
      score: score,
    };
  } catch (error) {
    console.log("error occuered while genartaing score");
    return {
      score: null,
    };
  }
};
