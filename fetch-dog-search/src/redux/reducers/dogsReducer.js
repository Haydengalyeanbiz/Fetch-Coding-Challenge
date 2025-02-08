import apiClient from '../../api/apiClient';

//fetching the dogs
const FETCH_DOGS_REQUEST = 'dogs/FETCH_DOGS_REQUEST';
const FETCH_DOGS_SUCCESS = 'dogs/FETCH_DOGS_SUCCESS';
const FETCH_DOGS_FAILURE = 'dogs/FETCH_DOGS_FAILURE';

// fetching the breeds
const FETCH_BREEDS_SUCCESS = 'dogs/FETCH_BREEDS_REQUEST';

const setRequest = () => ({
	type: FETCH_DOGS_REQUEST,
});

const setSuccess = (dogs, total) => ({
	type: FETCH_DOGS_SUCCESS,
	payload: { dogs, total },
});

const setFailure = () => ({
	type: FETCH_DOGS_FAILURE,
});

const breedSuccess = (breeds) => ({
	type: FETCH_BREEDS_SUCCESS,
	payload: breeds,
});

// thunk for fetching the dogs based on selected breeds and filters
export const fetchDogs = (filters) => async (dispatch) => {
	dispatch(setRequest());

	try {
		const response = await apiClient.get('/dogs/search', { params: filters });
		const dogIds = response.data.resultIds;
		const dogsResponse = await apiClient.post('/dogs', dogIds);
		if (dogsResponse.status === 200) {
			dispatch(setSuccess(dogsResponse.data, response.data.total));
		}
	} catch (error) {
		console.error('Fetching dogs failed:', error);
		dispatch(setFailure());
	}
};

// thunk for fetching the available breeds
export const fetchBreeds = () => async (dispatch) => {
	try {
		const response = await apiClient.get('/dogs/breeds');
		if (response.status === 200) {
			dispatch(breedSuccess(response.data));
		}
	} catch (error) {
		console.error('Fetching breeds failed:', error);
	}
};

const initialState = {
	dogs: [],
	total: 0,
	loading: false,
	breeds: [],
};

const dogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_DOGS_REQUEST:
			return { ...state, loading: true };
		case FETCH_DOGS_SUCCESS:
			return {
				...state,
				loading: false,
				dogs: action.payload.dogs,
				total: action.payload.total,
			};
		case FETCH_DOGS_FAILURE:
			return { ...state, loading: false };
		case FETCH_BREEDS_SUCCESS:
			return { ...state, breeds: action.payload };
		default:
			return state;
	}
};

export default dogsReducer;
