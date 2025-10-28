export const getRickAndMortyData = async () => {
  try {
    const request = await fetch("https://rickandmortyapi.com/api/character");
    const response = await request.json();

    if (!request.ok) {
      const errorData = await request.json();
      throw new Error(errorData.detail);
    }

    return response;
  } catch (error) {
    throw error;
  }
};
