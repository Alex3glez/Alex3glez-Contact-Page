export const getRickAndMortyData = async() => {
    try {
        const request= await fetch("https://rickandmortyapi.com/api/character");
        const response = await request.json();
        return response;
    } catch (error) { console.log(error);
    
        
    }
  }