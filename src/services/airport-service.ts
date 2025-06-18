import apiClient from '../utils/api-flight-client';

export const searchAirport = async (query: string) => {
  try {
    const response = await apiClient.get('/searchAirport',
      {
        params: { query },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY!,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST!,
        },
      }
    );

    return response.data.data; // returns list of matching airports
  } catch (error: any) {
    console.error('Airport search failed:', error.response?.data || error.message);
    throw error;
  }
};
