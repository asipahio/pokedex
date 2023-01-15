import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Results from '../../../components/Results/Results';
import { useParams } from 'react-router-dom';
import { useGetEvolutionChainQuery, useGetPokemonByNameQuery, useGetPokemonSpeciesQuery } from '../../../services/pokemon';
import { useDispatch } from 'react-redux';
import { Pokemon } from '../../../@types/IPokemon';
import mockPokemon from '../../json/pokemon.json';
import mockPokemonSpecies from '../../json/pokemon-species.json';
import mockEvolutionChain from '../../json/evolution-chain.json';

const mockeduseGetPokemonByNameQuery = useGetPokemonByNameQuery as jest.Mock<any>;
jest.mock('../../../services/pokemon')

const mockedUseGetPokemonSpeciesQuery = useGetPokemonSpeciesQuery as jest.Mock<any>;
jest.mock('../../../services/pokemon')

const mockedUseGetEvolutionChainQuery = useGetEvolutionChainQuery as jest.Mock<any>;
jest.mock('../../../services/pokemon')

const mockedUseParams = useParams as jest.Mock<any>;
jest.mock("react-router-dom");

const mockedUseDispatch = useDispatch as jest.Mock<any>;
jest.mock('react-redux');

jest.mock('../../../components/Search/Search', () => () => <div data-testid="Search"></div>);

describe('<Results />', () =>
{
    const url = "http://localhost";
    const mockedDispatchFn = jest.fn();
    beforeEach(() =>
    {
        mockeduseGetPokemonByNameQuery.mockReturnValue({
            data: mockPokemon,
            error: true
        });
        mockedUseGetPokemonSpeciesQuery.mockReturnValue({
            data: mockPokemonSpecies
        });
        mockedUseGetEvolutionChainQuery.mockReturnValue({
            data: ["pichu", "pikachu", "raichu"]
        });
        mockedUseParams.mockImplementation(() => ({
            key: "pikachu"
        }));

        mockedUseDispatch.mockReturnValue(mockedDispatchFn)
    });

    test('it should mount', () =>
    {
        render(<Results />);

        const results = screen.getByTestId('Results');

        expect(results).toBeInTheDocument();
    });

    test('it should not render evolution if null', () =>
    {
        mockedUseGetEvolutionChainQuery.mockReturnValueOnce({
            data: undefined
        });
        render(<Results />);

        const left = screen.queryByText('&laquo;');

        expect(left).not.toBeInTheDocument();
    });

    test('it should not render evolution downgrade if there is no option', async () =>
    {
        mockedUseGetEvolutionChainQuery.mockReturnValueOnce({
            data: ["pikachu", "raichu"]
        });
        render(<Results />);

        const left = screen.queryByText('&laquo;');
        const right = await screen.findByText('» raichu');

        expect(left).not.toBeInTheDocument();
        expect(right).toBeInTheDocument();
    });

    test('it should not get evolution if species is null', () =>
    {
        mockedUseGetPokemonSpeciesQuery.mockReturnValueOnce({
            data: undefined
        });
        render(<Results />);

        const left = screen.queryByText('&laquo;');

        expect(left).not.toBeInTheDocument();
    });
});