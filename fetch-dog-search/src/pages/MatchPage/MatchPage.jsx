import { useSelector, useDispatch } from 'react-redux';
import { findMatch } from '../../redux/reducers/favoritesReducer';

const MatchPage = () => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites.favorites);
	// handler to generate match from favorites
	const handleFindMatch = () => {
		if (!favorites.length) return;
		const favoriteIds = favorites.map((dog) => dog.id);
		dispatch(findMatch(favoriteIds));
	};
	return <div>Your final matched dog goes here!</div>;
};

export default MatchPage;
