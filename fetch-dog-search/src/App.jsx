import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import FavoritesPage from './pages/FavoritePage/FavoritesPage';
import MatchPage from './pages/MatchPage/MatchPage';
import NavBar from './components/Navbar/Navbar';
import './App.css';

function App() {
	const isAuthenticated = useSelector((state) => state.session.isAuthenticated);
	return (
		<div>
			{isAuthenticated && <NavBar />}
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
					path='/favorites'
					element={
						isAuthenticated ? (
							<FavoritesPage />
						) : (
							<Navigate
								to='/'
								replace
							/>
						)
					}
				/>
				<Route
					path='/match'
					element={
						isAuthenticated ? (
							<MatchPage />
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
