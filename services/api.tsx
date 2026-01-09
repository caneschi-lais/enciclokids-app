export interface Pokemon {
    id: string;
    name: string;
    image: string;
}

// busca pokemons na API
export const getPokemons = async (
    limit = 100,
    offset = 0,
): Promise<Pokemon[]> => {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        );
        const json = await response.json();

        return json.results.map((item: any) => {
            const id = item.url.split("/")[6];
            return {
                id,
                name: item.name,
                image:
                    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            };
        });
    } catch (error) {
        console.error("Erro ao buscar pokemons", error);
        return [];
    }
};
