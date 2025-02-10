import { useSelector, useDispatch } from 'react-redux';
import {
	removeFavorite,
	setFavorite,
} from '../../redux/reducers/favoritesReducer';
import './FavoritesPage.css';

const FavoritesPage = () => {
	const dispatch = useDispatch();
	const favorites = useSelector((state) => state.favorites.favorites);

	return (
		<div className='favorites-section'>
			<h2>Your Favorites</h2>
			<div className='favorites-list'>
				{favorites.map((dog) => (
					<div
						key={dog.id}
						className='dog-card'
					>
						<img
							src={dog.img}
							alt={dog.name}
						/>
						<h3>{dog.name}</h3>
						<button onClick={() => dispatch(removeFavorite(dog.id))}>
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default FavoritesPage;
