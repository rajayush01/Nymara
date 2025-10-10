import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { CurrencyProvider } from "./contexts/CurrencyContext";
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
			<CurrencyProvider>
				<App />
			</CurrencyProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
