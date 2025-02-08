import apiClient from '../../api/apiClient';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = () => ({
	type: SET_USER,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

export const login = (name, email) => async (dispatch) => {
	try {
		const response = await apiClient.post('/auth/login', { name, email });
		if (response.status === 200) {
			dispatch(setUser());
			return response.data;
		}
	} catch (error) {
		console.error('Login failed', error);
	}
};

export const logout = () => async (dispatch) => {
	try {
		const response = await apiClient.post('/auth/logout');
		if (response.status === 200) {
			dispatch(removeUser());
			return response.data;
		}
	} catch (error) {
		console.error('Logout failed', error);
	}
};

const initialState = {
	isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, isAuthenticated: true };
		case REMOVE_USER:
			return { ...state, isAuthenticated: false };
		default:
			return state;
	}
};

export default authReducer;
