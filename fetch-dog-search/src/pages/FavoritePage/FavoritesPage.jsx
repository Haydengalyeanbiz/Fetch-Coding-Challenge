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
				{favorites.length > 0 ? (
					favorites.map((dog) => (
						<div
							key={dog.id}
							className='dog-card-favorites'
						>
							<div className='dog-card-img-holder-favorites'>
								<img
									className='dog-card-img-favorites'
									src={dog.img}
									alt={dog.name}
								/>
							</div>
							<h3>{dog.name}</h3>
							<button
								className='remove-btn'
								onClick={() => dispatch(removeFavorite(dog.id))}
							>
								Remove
							</button>
						</div>
					))
				) : (
					<h3>No favorites</h3>
				)}
			</div>
		</div>
	);
};

export default FavoritesPage;
