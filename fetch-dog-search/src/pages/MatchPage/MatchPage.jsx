import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findMatch } from '../../redux/reducers/favoritesReducer';
import './MatchPage.css';
import Lottie from 'react-lottie';
import animationData from '../../lotties/Animation - 1739232449720.json';

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

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	useEffect(() => {
		if (matchDog) {
			const timer = setTimeout(() => {
				setIsSpinning(false);
				setShowResult(true);
			}, 2000);
		}
	}, [matchDog]);
	return (
		<div className='match-me-section'>
			<h1>Match Mini Game</h1>

			<button
				className=''
				onClick={handleFindMatch}
				disabled={isSpinning || !favorites.length}
			>
				Play Match Game
			</button>

			{isSpinning && (
				<div>
					<Lottie
						options={defaultOptions}
						height={400}
						width={400}
					/>
				</div>
			)}

			{showResult && matchDog && (
				<div className='result-div'>
					<h2>✨ Your Match is: {matchDog.name}! ✨</h2>
					<p>Breed: {matchDog.breed}</p>
					<p>Age: {matchDog.age}</p>
					<img
						className='result-img'
						src={matchDog.img}
						alt={matchDog.name}
					/>
				</div>
			)}
		</div>
	);
};

export default MatchPage;
