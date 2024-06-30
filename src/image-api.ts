import axios from "axios";

export const getImages = async<T> (setSearchQuery: string, setPage: number): Promise<T> => {
  try {
    const response = await axios.get<T>(`https://api.unsplash.com/search/photos`, {
      params: {
        query: setSearchQuery,
        client_id: "r_quNYdHJ0e4Rb5wiwR1r8zIptldSFBy4re0f0miwdU",
        page: setPage,
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
