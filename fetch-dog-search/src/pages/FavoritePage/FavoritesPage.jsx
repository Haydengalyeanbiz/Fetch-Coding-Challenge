import { useSelector, useDispatch } from 'react-redux';
import {
	removeFavorite,
	setFavorite,
} from '../../redux/reducers/favoritesReducer';

const FavoritesPage = () => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites.favorites);

	return (
		<div
			className='favorites-section'
			style={{ marginTop: '2rem' }}
		>
			<h2>Your Favorites</h2>
			{favorites.map((dog) => (
				<div key={dog.id}>
					<img
						src={dog.img}
						alt={dog.name}
					/>
					<h3>{dog.name}</h3>
					<button onClick={() => dispatch(removeFavorite(dog.id))}>X</button>
				</div>
			))}
		</div>
	);
};

export default FavoritesPage;
