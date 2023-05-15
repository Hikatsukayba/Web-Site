import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
import 'simplebar/dist/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// apex-chart
import './assets/third-party/apex-chart.css';

// import react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// project import
import App from './App';
import { store } from './store';
import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const clientQuery = new QueryClient();

const root = createRoot(document.getElementById('root')!); // createRoot(container!) if you use TypeScript
root.render(
        <QueryClientProvider client={clientQuery}>
            <ReduxProvider store={store}>
                <BrowserRouter basename="/">
                    <App />
                </BrowserRouter>
            </ReduxProvider>
        </QueryClientProvider>
);
