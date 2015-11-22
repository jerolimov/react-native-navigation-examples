
import { combineReducers } from 'redux';
import { REHYDRATE } from 'redux-persist/constants';

const SUPPORTED_VERSION = 1;

const INITIAL_STATE = {
	version: SUPPORTED_VERSION,
	example: null
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case REHYDRATE:
			if(/*action.key === 'navigation' &&*/ action.payload && action.payload.version === SUPPORTED_VERSION) {
				return { ...state, ...action.payload };
			} else {
				return state;
			}

		case 'SELECT_EXAMPLE':
			return {
				...state,
				example: action.example
			};

		default:
			return state;
	}
}

//export default combineReducers({
//});
