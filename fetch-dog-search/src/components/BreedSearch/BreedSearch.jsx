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
		<div
			className='breed-search'
			style={{ position: 'relative' }}
		>
			{loadingBreeds ? (
				<p>Loading breeds...</p>
			) : (
				<>
					<label htmlFor='breedSearch'>Type to Filter by Breed:</label>
					<input
						id='breedSearch'
						type='text'
						placeholder='e.g. Husky'
						value={query}
						onChange={handleInputChange}
						onFocus={() => setShowSuggestions(true)}
						style={{ width: '200px', marginLeft: '0.5rem' }}
					/>
					{showSuggestions && query.length > 0 && (
						<ul
							className='suggestions'
							style={{
								position: 'absolute',
								zIndex: 999,
								background: '#fff',
								border: '1px solid #ccc',
								margin: 0,
								padding: '0.5rem',
								listStyleType: 'none',
								width: '200px',
							}}
						>
							{filteredBreeds.slice(0, 8).map((breed) => (
								<li
									key={breed}
									onClick={() => handleSuggestionClick(breed)}
									style={{
										padding: '0.25rem 0',
										cursor: 'pointer',
										color: 'blue',
									}}
								>
									{breed}
								</li>
							))}
							{filteredBreeds.length === 0 && (
								<li style={{ color: '#999' }}>No breeds match.</li>
							)}
						</ul>
					)}
				</>
			)}
		</div>
	);
};

export default BreedSearch;
