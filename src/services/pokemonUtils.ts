import { IChain, IEvolutionChain } from "../@types/IEvolutionChain";

export const pokemonUtils = {
    transformEvolutionChainResponse: (response: IEvolutionChain) =>
    {
        const getLevels = (obj: IChain, arr: string[]): string[] =>
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