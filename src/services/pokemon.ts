import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Chain, EvolutionChain } from '../@types/IEvolutionChain'
import { Pokemon } from '../@types/IPokemon'
import { PokemonSpecies } from '../@types/IPokemonSpecies'
import { pokemonUtils } from './pokemonUtils'

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemonByName: builder.query<Pokemon, string>({
            query: (name) => `pokemon/${name.toLowerCase()}`,
        }),
        getPokemonSpecies: builder.query<PokemonSpecies, string>({
            query: (name) => `pokemon-species/${name.toLowerCase()}`,
        }),
        getEvolutionChain: builder.query<string[], string>({
            query: (url) => url,
            transformResponse: pokemonUtils.transformEvolutionChainResponse,
        }),
    }),
});

export const historySlice = createSlice({
    name: 'history',
    initialState: [] as string[],
    reducers: {
        append(state, keyword: PayloadAction<string>)
        {
            state.unshift(keyword.payload);
        },
    },
})

export const { append } = historySlice.actions
export const selectHistory = (state: any) => state.history
export const { useGetPokemonByNameQuery, useGetEvolutionChainQuery, useGetPokemonSpeciesQuery } = pokemonApi