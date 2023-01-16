import '@testing-library/jest-dom/extend-expect';
import { IEvolutionChain } from '../../@types/IEvolutionChain';
import { pokemonUtils } from '../../services/pokemonUtils';
import _evolutionChain from '../json/evolution-chain.json'

describe('<Search />', () =>
{
    beforeEach(() =>
    {
    });

    test('it should mount', async () =>
    {
        const evolutionChain = _evolutionChain as IEvolutionChain;
        evolutionChain!.chain!.evolves_to![0].evolves_to![0].evolves_to!.push({
            "evolves_to": undefined,
            "is_baby": false,
        });
        const chainArray = pokemonUtils.transformEvolutionChainResponse(evolutionChain);

        expect(chainArray).toEqual(["pichu", "pikachu", "raichu"])
    });
});