import axios from "axios";

export const fetchArticles = async (location) => {
  const query = `safety in ${location}`;
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CSE_ID}`;

  try {
    const response = await axios.get(url);

    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};
