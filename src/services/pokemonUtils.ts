import { Chain, EvolutionChain } from "../@types/IEvolutionChain";

export const pokemonUtils = {
    transformEvolutionChainResponse: (response: EvolutionChain) =>
    {
        const getLevels = (obj: Chain, arr: string[]): string[] =>
        {
            if (obj.species) {
                arr.push(obj.species.name);
            }
            if (obj.evolves_to) {
                obj.evolves_to.forEach((sub) =>
                {
                    getLevels(sub, arr)
                })
            }
            return arr;
        }

        return getLevels(response?.chain, []);
    }
}