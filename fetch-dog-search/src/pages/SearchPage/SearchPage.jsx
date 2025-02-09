import './SearchPage.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDogs, fetchBreeds } from '../../redux/reducers/dogsReducer';
import {
	setFavorite,
	removeFavorite,
} from '../../redux/reducers/favoritesReducer';
import BreedSearch from '../../components/BreedSearch/BreedSearch';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { LuBone } from 'react-icons/lu';
// this component has a lot of moving parts so I put comments to help organize and explain what is going on
const SearchPage = () => {
	const dispatch = useDispatch();

	// make the local state variables
	const [breedFilter, setBreedFilter] = useState('');
	const [sortOrder, setSortOrder] = useState('desc');
	const [pageCursor, setPageCursor] = useState(0);
	const [pageSize, setPageSize] = useState(5);

	// grab the redux state variables
	const { dogs, total, loading, breeds } = useSelector((state) => state.dogs);
	const { favorites, match } = useSelector((state) => state.favorites);

	// fetch the dogs when component mounts or when the filters/params change
	useEffect(() => {
		// first build the query params for /dogs/search
		const filters = {};
		// if there is a filter we apply it
		if (breedFilter) {
			filters.breeds = [breedFilter];
		}
		// sort by breed + direction
		filters.sort = `breed:${sortOrder}`;
		// add the pagination
		filters.size = pageSize;
		filters.from = pageCursor;
		//dispatch the fetch
		dispatch(fetchDogs(filters));
	}, [dispatch, breedFilter, sortOrder, pageCursor, pageSize]);

	// function for sorting order of dogs
	const handleToggleSort = () => {
		setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
	};

	// pagination handlers
	const handleNextPage = () => {
		if (pageCursor + pageSize < total) {
			setPageCursor((prev) => prev + pageSize);
		}
	};
	const handlePrevPage = () => {
		if (pageCursor - pageSize >= 0) {
			setPageCursor((prev) => prev - pageSize);
		}
	};

	// handler for adding and removing favorites
	const handleFavorite = (dog) => {
		const alreadyFavorite = favorites.find((fav) => fav.id === dog.id);
		if (alreadyFavorite) {
			dispatch(removeFavorite(dog.id));
		} else {
			dispatch(setFavorite(dog));
		}
	};

	return (
		<div className='search-container'>
			<h1 className='search-title'>
				<LuBone /> Find your new fureverfriend <LuBone />
			</h1>

			{/* Search for the breeds */}
			<BreedSearch
				selectedBreed={breedFilter}
				onSelectBreed={(breed) => {
					setBreedFilter(breed);
					setPageCursor(0);
				}}
			/>

			{/* Sort Toggle */}
			<div className='sort-toggle'>
				<button
					onClick={handleToggleSort}
					className='search-sort-button'
				>
					Sort by Breed: {sortOrder.toUpperCase()}
				</button>
			</div>

			{/* Pagination Controls top */}
			<div className='pagination-controls'>
				<div className='controls-btn-holder'>
					<button
						onClick={handlePrevPage}
						disabled={pageCursor === 0}
					>
						Previous
					</button>
					<button
						onClick={handleNextPage}
						disabled={pageCursor + pageSize >= total}
					>
						Next
					</button>
				</div>
				<p>
					Showing {dogs.length} of {total} total
				</p>
			</div>

			{/* Loading indicator */}
			{loading && <p>Loading dogs...</p>}

			{/* Dog Results */}
			<div className='dog-list'>
				{!loading &&
					dogs.map((dog) => {
						const isFavorited = favorites.some((fav) => fav.id === dog.id);
						return (
							<div
								key={dog.id}
								className='dog-card'
							>
								<img
									className='dog-card-img'
									src={dog.img}
									alt={dog.name}
								/>
								<div className='dog-card-info'>
									<h3>{dog.name}</h3>
									<p>Breed: {dog.breed}</p>
									<p>Age: {dog.age}</p>
									<p>Zip Code: {dog.zip_code}</p>

									<button onClick={() => handleFavorite(dog)}>
										{isFavorited ? <FaHeart /> : <CiHeart />}
									</button>
								</div>
							</div>
						);
					})}
			</div>
			{/* Pagination Controls bottom */}
			<div className='pagination-controls'>
				<div className='controls-btn-holder'>
					<button
						onClick={handlePrevPage}
						disabled={pageCursor === 0}
					>
						Previous
					</button>
					<button
						onClick={handleNextPage}
						disabled={pageCursor + pageSize >= total}
					>
						Next
					</button>
				</div>
				<p>
					Showing {dogs.length} of {total} total
				</p>
			</div>
		</div>
	);
};

export default SearchPage;
