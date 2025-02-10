import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findMatch } from '../../redux/reducers/favoritesReducer';

const MatchPage = () => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites.favorites);
	const matchDog = useSelector((state) => state.favorites.match);

	const [isSpinning, setIsSpinning] = useState(false);
	const [showResult, setShowResult] = useState(false);

	// handler to generate match from favorites
	const handleFindMatch = () => {
		if (!favorites.length) return;
		const favoriteIds = favorites.map((dog) => dog.id);
		setIsSpinning(true);
		setShowResult(false);
		dispatch(findMatch(favoriteIds));
	};

	useEffect(() => {
		if (matchDog) {
			const timer = setTimeout(() => {
				setIsSpinning(false);
				setShowResult(true);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [matchDog]);
	return (
		<div style={{ textAlign: 'center', marginTop: '2rem' }}>
			<h1>Match Mini Game</h1>

			<button
				onClick={handleFindMatch}
				disabled={isSpinning || !favorites.length}
			>
				Play Match Game
			</button>

			{isSpinning && (
				<div style={{ marginTop: '1rem' }}>
					<p className='spin-text'>Spinning...</p>
				</div>
			)}

			{showResult && matchDog && (
				<div style={{ marginTop: '2rem', transition: 'opacity 0.5s' }}>
					<h2>✨ Your Match is: {matchDog.name}! ✨</h2>
					<img
						src={matchDog.img}
						alt={matchDog.name}
						style={{ width: '300px', height: '300px', objectFit: 'cover' }}
					/>
					<p>Breed: {matchDog.breed}</p>
					<p>Age: {matchDog.age}</p>
				</div>
			)}
		</div>
	);
};

export default MatchPage;
