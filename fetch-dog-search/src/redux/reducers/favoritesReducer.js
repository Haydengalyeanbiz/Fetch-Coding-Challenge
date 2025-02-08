import apiClient from '../../api/apiClient';

const ADD_FAVORITE = 'favorite/ADD_FAVORITE';
const REMOVE_FAVORITE = 'favorite/REMOVE_FAVORITE';
const SET_MATCH = 'favorite/SET_MATCH';

export const setFavorite = (dog) => ({
	type: ADD_FAVORITE,
	payload: dog,
});

export const removeFavorite = (dogId) => ({
	type: REMOVE_FAVORITE,
	payload: dogId,
});

export const setMatch = (dog) => ({
	type: SET_MATCH,
	payload: dog,
});

const initialState = {
	favorites: [],
	match: null,
};

export const findMatch = (favoriteDogIds) => async (dispatch) => {
	try {
		const response = await apiClient.post('/dogs/match', favoriteDogIds);
		if (response.status === 200) {
			dispatch(setMatch(response.data.match));
		}
	} catch (error) {
		console.error('Matching failed', error);
	}
};

const favoritesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_FAVORITE:
			return { ...state, favorites: [...state.favorites, action.payload] };
		case REMOVE_FAVORITE:
			return {
				...state,
				favorites: state.favorites.filter((dog) => dog.id !== action.payload),
			};
		case 'SET_MATCH':
			return { ...state, match: action.payload };
		default:
			return state;
	}
};

export default favoritesReducer;
