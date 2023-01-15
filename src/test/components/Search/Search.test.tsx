import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from '../../../components/Search/Search';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event'

const mockedUseNavigate = useNavigate as jest.Mock<any>;
jest.mock("react-router-dom");

const mockedUseSelector = useSelector as jest.Mock<any>;
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

describe('<Search />', () =>
{
    const navigate = jest.fn();
    beforeEach(() =>
    {
        mockedUseSelector.mockReturnValue(["pikachu"])
        mockedUseNavigate.mockImplementation(() => navigate);
    });

    test('it should mount', async () =>
    {
        await act(async () =>
        {
            render(<Search />);
        });

        const search = screen.getByTestId('Search');

        expect(search).toBeInTheDocument();
    });

    test('it should search', async () =>
    {
        const user = userEvent.setup()

        await act(async () =>
        {
            render(<Search />);
        });

        const input = screen.getByRole('textbox');
        await user.type(input, "pikachu{enter}");

        expect(navigate).toBeCalledTimes(1);
    });

    test('it should set the keyword', async () =>
    {
        const user = userEvent.setup()

        await act(async () =>
        {
            render(<Search keyword="test" />);
        });

        const input = screen.getByDisplayValue('test');

        expect(input).toBeInTheDocument();
    });
});