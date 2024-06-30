import axios from "axios";

axios.defaults.baseURL = "http://hn.algolia.com/api/v1";


export const getArticles = async<T> (topic: string, currentPage: number): Promise<T> => {
  const response = await axios.get("/search", {
    params: {
      query: topic,
      page: currentPage,
      hitsPerPage: 5,
    },
  });
  return response.data.hits;
};
