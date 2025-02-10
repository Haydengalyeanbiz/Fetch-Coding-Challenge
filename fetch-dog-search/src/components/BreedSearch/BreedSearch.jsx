import './BreedSearch.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreeds } from '../../redux/reducers/dogsReducer';

const BreedSearch = ({ selectedBreed, onSelectBreed }) => {
	const dispatch = useDispatch();
	const { breeds, loadingBreeds } = useSelector((state) => state.dogs);

	const [query, setQuery] = useState('');
	const [showSuggestions, setShowSuggestions] = useState(false);

	useEffect(() => {
		dispatch(fetchBreeds());
	}, [dispatch]);

	useEffect(() => {
		setQuery(selectedBreed);
	}, [selectedBreed]);

	const handleInputChange = (e) => {
		setQuery(e.target.value);
		setShowSuggestions(true);
	};

	const handleSuggestionClick = (breed) => {
		onSelectBreed(breed);
		setQuery(breed);
		setShowSuggestions(false);
	};

	const filteredBreeds = breeds.filter((b) =>
		b.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<div className='breed-search'>
			{loadingBreeds ? (
				<p>Loading breeds...</p>
			) : (
				<>
					<label htmlFor='breedSearch'>Filter by Breed:</label>
					<div className='breed-search-dropdown'>
						<input
							id='breedSearch'
							type='text'
							placeholder='e.g. Husky'
							value={query}
							onChange={handleInputChange}
							onFocus={() => setShowSuggestions(true)}
							className='breed-search-input'
						/>
						{showSuggestions && query.length > 0 && (
							<ul className='suggestions'>
								{filteredBreeds.slice(0, 8).map((breed) => (
									<li
										key={breed}
										onClick={() => handleSuggestionClick(breed)}
										className='breed-suggestion'
									>
										{breed}
									</li>
								))}
								{filteredBreeds.length === 0 && (
									<li className='breed-suggestion'>No breeds match.</li>
								)}
							</ul>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default BreedSearch;
