import React, { Suspense } from 'react';
import
{
    Routes,
    Route,
} from "react-router-dom";
import './App.scss';

// Components
import Search from './components/Search/Search.lazy';
import Results from './components/Results/Results.lazy';

function App()
{
    return (
        <div className="container mx-auto App" data-testid="App">
            <Suspense fallback={<p> Loading...</p>}>
                <Routes>
                    <Route path='/search/:key' element={<Results />} />
                    <Route path='/search' element={<Search />} />
                    <Route path="*" element={<Search />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
