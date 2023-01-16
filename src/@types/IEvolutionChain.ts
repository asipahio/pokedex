export interface IEvolutionChain
{
    baby_trigger_item: null;
    chain: IChain;
    id: number;
}

export interface IChain
{
    evolution_details?: IEvolutionDetail[];
    evolves_to?: IChain[];
    is_baby?: boolean;
    species?: ISpecies;
}

export interface IEvolutionDetail
{
    gender: null;
    held_item: null;
    item: ISpecies | null;
    known_move: null;
    known_move_type: null;
    location: null;
    min_affection: null;
    min_beauty: null;
    min_happiness: number | null;
    min_level: null;
    needs_overworld_rain: boolean;
    party_species: null;
    party_type: null;
    relative_physical_stats: null;
    time_of_day: string;
    trade_species: null;
    trigger: ISpecies;
    turn_upside_down: boolean;
}

export interface ISpecies
{
    name: string;
    url: string;
}
