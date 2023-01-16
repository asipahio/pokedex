import { ISpecies } from "./IEvolutionChain";

export interface IPokemon
{
    abilities: IAbility[];
    base_experience: number;
    forms: ISpecies[];
    game_indices: IGameIndex[];
    height: number;
    held_items: any[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: IMove[];
    name: string;
    order: number;
    past_types: any[];
    species: ISpecies;
    sprites: ISprites;
    stats: IStat[];
    types: IType[];
    weight: number;
}

export interface IAbility
{
    ability: ISpecies;
    is_hidden: boolean;
    slot: number;
}

export interface IGameIndex
{
    game_index: number;
    version: ISpecies;
}

export interface IMove
{
    move: ISpecies;
    version_group_details: IVersionGroupDetail[];
}

export interface IVersionGroupDetail
{
    level_learned_at: number;
    move_learn_method: ISpecies;
    version_group: ISpecies;
}

export interface ISprites
{
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
    other?: IOther;
    animated?: ISprites;
}

export interface ICrystal
{
    back_default: string;
    back_shiny: string;
    back_shiny_transparent: string;
    back_transparent: string;
    front_default: string;
    front_shiny: string;
    front_shiny_transparent: string;
    front_transparent: string;
}

export interface IGold
{
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    front_transparent?: string;
}

export interface IOfficialArtwork
{
    front_default: string;
    front_shiny: string;
}

export interface IHome
{
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
}

export interface IDreamWorld
{
    front_default: string;
    front_female: null;
}

export interface IOther
{
    dream_world: IDreamWorld;
    home: IHome;
    "official-artwork": IOfficialArtwork;
}

export interface IStat
{
    base_stat: number;
    effort: number;
    stat: ISpecies;
}

export interface IType
{
    slot: number;
    type: ISpecies;
}
