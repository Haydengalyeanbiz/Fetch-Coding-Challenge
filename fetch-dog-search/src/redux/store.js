import {
	legacy_createStore as createStore,
	applyMiddleware,
	combineReducers,
	compose,
} from 'redux';
import { createLogger } from 'redux-logger';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducer';
import dogsReducer from './reducers/dogsReducer';
import favoritesReducer from './reducers/favoritesReducer';

const rootReducer = combineReducers({
	session: authReducer,
	dogs: dogsReducer,
	favorites: favoritesReducer,
});

let enhancer;
if (import.meta.env.MODE === 'production') {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = (await import('redux-logger')).default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
