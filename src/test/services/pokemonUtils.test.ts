import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pokemonUtils } from '../../services/pokemonUtils';
import evolutionChain from '../json/evolution-chain.json'

describe('<Search />', () =>
{
    const navigate = jest.fn();
    beforeEach(() =>
    {
    });

    test('it should mount', async () =>
    {
        const chainArray = pokemonUtils.transformEvolutionChainResponse(evolutionChain);

        expect(chainArray).toEqual(["pichu", "pikachu", "raichu"])
    });
});