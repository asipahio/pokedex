import { ISpecies } from "./IEvolutionChain";

export interface IPokemonSpecies
{
    evolution_chain: ISpecies;
    flavor_text_entries: IFlavorTextEntries[]
}

export interface IFlavorTextEntries
{
    flavor_text: string
    language: ILanguage
}

export interface ILanguage
{
    name: string
}