
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

//import thunkMiddleware from 'redux-thunk';

import * as actions from './actions';
import reducer from './reducers';

let middlewares = [];//thunkMiddleware

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default store = createStoreWithMiddleware(reducer);
export const pureActions = actions;
export const bindActions = bindActionCreators(actions, store.dispatch);

const persistant = persistStore(store, {storage: AsyncStorage});
