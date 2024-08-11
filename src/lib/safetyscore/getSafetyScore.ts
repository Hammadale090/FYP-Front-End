import { fetchArticles } from "./fetchArticles";
import { getSafetyScoreFromAI, processArticles } from "./processArticles";

export const getSafetyScore = async (location) => {
  try {
    const articles = await fetchArticles(location);
    // console.log("articles are : ", articles);
    const summaries = await processArticles(articles, location);
    // console.log("summaries are : ", summaries);
    const safety_score = await getSafetyScoreFromAI(summaries, location);
    // console.log("safety_score are : ", safety_score);

    const jsonResponse = {
      location: location,
      safety_score: safety_score.score,
    };
    // console.log(JSON.stringify(jsonResponse, null, 2));
    return safety_score.score;
  } catch (error) {
    console.error("---Error occured --:", error);
  }
};

// const location = "Toronto";
// // const location = "Islamabad F6";
// getSafetyScore(location);
