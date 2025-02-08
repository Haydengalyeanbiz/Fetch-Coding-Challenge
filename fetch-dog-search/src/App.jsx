import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import './App.css';

function App() {
	const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
	return (
		<div>
			<Routes>
				<Route
					path='/'
					element={
						isAuthenticated ? (
							<Navigate
								to='/search'
								replace
							/>
						) : (
							<LoginPage />
						)
					}
				/>
				<Route
					path='/search'
					element={
						isAuthenticated ? (
							<SearchPage />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
				<Route
					path='*'
					element={
						<Navigate
							to='/'
							replace
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
