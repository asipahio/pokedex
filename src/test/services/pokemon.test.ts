import { historySlice, append } from '../../services/pokemon'

test('should return the initial state', () =>
{
    expect(historySlice.reducer(undefined, { type: undefined })).toEqual([

    ])
})

test('should handle a history being added to an empty list', () =>
{
    const previousState: string[] = []

    expect(historySlice.reducer(previousState, append('pikachu'))).toEqual([
        "pikachu"
    ])
})

test('should handle a history being added to an existing list', () =>
{
    const previousState: string[] = [
        "pikachu"
    ]

    expect(historySlice.reducer(previousState, append('raichu'))).toEqual([
        "raichu",
        "pikachu",
    ])
})