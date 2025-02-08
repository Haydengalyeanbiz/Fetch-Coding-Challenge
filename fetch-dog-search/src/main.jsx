import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/store.js';
import './index.css';
import App from './App.jsx';
import * as sessionActions from './redux/reducers/authReducer.js';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
	window.store = store;
	window.sessionActions = sessionActions;
}

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
