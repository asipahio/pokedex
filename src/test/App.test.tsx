import { act, render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../components/Search/Search', () => () => <div data-testid="Search"></div>);

describe('App', () =>
{
    beforeEach(() =>
    {
    });
    afterEach(() =>
    {
        jest.clearAllMocks();
    });

    test('it should render search component by default', async () =>
    {
        render(<BrowserRouter><App /></BrowserRouter>);

        let app;
        await act(async () =>
        {
            app = screen.getByTestId("App");
        });

        expect(app).toBeInTheDocument();
    });
});
